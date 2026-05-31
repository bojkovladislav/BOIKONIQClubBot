import { Bot, Context, InlineKeyboard } from 'grammy/web';
import { translations, type Language } from './locales';
import { prisma } from '../../lib/prisma';

const token = process.env['TELEGRAM_BOT_TOKEN'];

if (!token) {
    throw new Error(
        'TELEGRAM_BOT_TOKEN is not defined in the environment variables!',
    );
}

export const bot = new Bot(token);
const userLanguages = new Map<number, Language>();

async function handleLanguageSelection(ctx: Context, lang: Language) {
    const userId = ctx.from?.id;

    if (!userId) return;

    userLanguages.set(userId, lang);

    await ctx.answerCallbackQuery();
    await ctx.reply(translations[lang].language_selected);
    await ctx.reply(translations[lang].prompt_code);
}

async function processCodeActivation(
    ctx: Context,
    inputCode: string,
    lang: Language,
) {
    const tgUser = ctx.from!;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    const bookCode = await prisma.bookCode.findUnique({
        where: { code: inputCode },
    });

    if (!bookCode) {
        await ctx.reply(translations[lang].invalid_code);

        return;
    }

    if (bookCode.status !== 'UNUSED') {
        await ctx.reply(translations[lang].used_code);

        return;
    }

    await ctx.reply(translations[lang].verifying_code);

    await prisma.$transaction(async (tx) => {
        const user = await tx.user.upsert({
            where: { telegramId: tgUser.id },
            update: {
                username: tgUser.username,
                firstName: tgUser.first_name,
                lastName: tgUser.last_name,
            },
            create: {
                telegramId: BigInt(tgUser.id),
                username: tgUser.username,
                firstName: tgUser.first_name,
                lastName: tgUser.last_name,
                language: lang,
            },
        });

        await tx.bookCode.update({
            where: { id: bookCode.id },
            data: { status: 'ACTIVE', activatedAt: startDate },
        });

        await tx.subscription.create({
            data: {
                userId: user.id,
                bookCodeId: bookCode.id,
                status: 'TRIAL',
                startDate: startDate,
                endDate: endDate,
            },
        });
    });

    const chatId = process.env['TELEGRAM_CHANNEL_ID'];

    if (!chatId) {
        throw new Error('TELEGRAM_CHANNEL_ID is not defined in your env!');
    }

    const inviteLinkInfo = await ctx.api.createChatInviteLink(chatId, {
        name: `Code Activation - ${tgUser.first_name}`,
        member_limit: 1,
        expire_date: Math.floor(Date.now() / 1000) + 86400,
    });

    const localeString = lang === 'uk' ? 'uk-UA' : 'en-US';
    const formattedDate = endDate.toLocaleDateString(localeString);

    const uniqueLink = inviteLinkInfo.invite_link;

    await ctx.reply(translations[lang].success(formattedDate, uniqueLink));
}

bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('🇺🇦 Українська', 'set_lang_uk')
        .text('🇬🇧 English', 'set_lang_en');

    await ctx.reply(translations.en.welcome, { reply_markup: keyboard });
});

bot.callbackQuery(
    'set_lang_uk',
    async (ctx) => await handleLanguageSelection(ctx, 'uk'),
);

bot.callbackQuery(
    'set_lang_en',
    async (ctx) => await handleLanguageSelection(ctx, 'en'),
);

bot.on('message:text', async (ctx) => {
    const userId = ctx.from.id;
    const lang = userLanguages.get(userId) || 'en';
    const inputCode = ctx.message.text.trim().toUpperCase();

    if (!ctx.from) {
        await ctx.reply(translations[lang].invalid_user_profile);

        return;
    }

    try {
        await processCodeActivation(ctx, inputCode, lang);
    } catch (error) {
        console.error('Error during code validation transaction:', error);

        await ctx.reply(translations[lang].error);
    }
});
