import { InlineKeyboard } from 'grammy';
import { prisma } from '../../lib/prisma';
import { bot } from '../bot/bot';
import { translations, type Language } from '../bot/locales';

function createRenewalKeyboard(lang: Language): InlineKeyboard {
    return new InlineKeyboard().text(
        translations[lang].renew_subscription_button,
        'renew_prompt',
    );
}

async function kickUserFromChannel(telegramId: string, lang: 'en' | 'uk') {
    try {
        const channelId = process.env['TELEGRAM_CHANNEL_ID']!;
        const numericId = Number(telegramId);

        await bot.api.banChatMember(channelId, numericId);
        await bot.api.unbanChatMember(channelId, numericId);

        console.log(
            `Successfully removed Telegram User ${telegramId} from Telegram Channel.`,
        );

        await bot.api.sendMessage(
            numericId,
            translations[lang].expired_notification,
            {
                parse_mode: 'Markdown',
                reply_markup: createRenewalKeyboard(lang),
            },
        );
    } catch (error) {
        console.error(
            `Failed to kick user ${telegramId} from Telegram Channel:`,
            error,
        );
    }
}

async function manageNearlyExpiredSubscriptions() {
    try {
        const now = new Date();
        const twentyFourHoursFromNow = new Date(
            now.getTime() + 24 * 60 * 60 * 1000,
        );

        const imminentExpirations = await prisma.subscription.findMany({
            where: {
                endDate: {
                    gt: now,
                    lte: twentyFourHoursFromNow,
                },
                status: 'TRIAL',
                warningSent: false,
            },
            include: { user: true },
        });

        for (const sub of imminentExpirations) {
            if (sub.user?.telegramId) {
                const userLang = (sub.user.language as 'uk' | 'en') || 'en';

                try {
                    await bot.api.sendMessage(
                        Number(sub.user.telegramId),
                        translations[userLang].warning_notification,
                        {
                            parse_mode: 'Markdown',
                            reply_markup: createRenewalKeyboard(userLang),
                        },
                    );

                    await prisma.subscription.update({
                        where: { id: sub.id },
                        data: { warningSent: true },
                    });
                } catch (error) {
                    console.error(
                        `Could not DM warning to user ${sub.user.telegramId}:`,
                        error,
                    );
                }
            }
        }
    } catch (error) {
        console.error(
            'Error running nearly-expired subscription checking:',
            error,
        );
    }
}

async function manageExpiredSubscriptions() {
    try {
        const now = new Date();

        const expiredSubscriptions = await prisma.subscription.findMany({
            where: {
                endDate: { lte: now },
                status: 'TRIAL',
            },
            include: { user: true },
        });

        if (expiredSubscriptions.length === 0) {
            console.log('No expired subscriptions found.');
            return;
        }

        for (const sub of expiredSubscriptions) {
            const userLang = (sub.user?.language as 'uk' | 'en') || 'en';

            await prisma.$transaction([
                prisma.subscription.delete({
                    where: { id: sub.id },
                }),
                prisma.bookCode.update({
                    where: { id: sub.bookCodeId },
                    data: { status: 'EXPIRED' },
                }),
            ]);

            if (sub.user?.telegramId) {
                await kickUserFromChannel(
                    String(sub.user.telegramId),
                    userLang,
                );
            }
        }
    } catch (error) {
        console.error(
            'Critical error during subscription expiration check:',
            error,
        );
    }
}

async function processSubscriptionCrunches() {
    try {
        await manageNearlyExpiredSubscriptions();
        await manageExpiredSubscriptions();
    } catch (error) {
        console.error('Could not manage subscriptions:', error);
    }
}

await processSubscriptionCrunches();
