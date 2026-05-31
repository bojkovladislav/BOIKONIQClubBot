export const translations = {
    en: {
        welcome:
            '👋 Welcome to the BOIKONIQ Club Bot! Please choose your language to continue:',
        language_selected: 'English selected!',
        invalid_user_profile:
            'Упс, щось пішло не так... Я не можу верифікувати ваш телеграм профіль',
        prompt_code:
            '🎯 Please send your access code to unlock your club membership.',
        verifying_code:
            '🔄 Validating your code and preparing your premium access link...',
        invalid_code: '❌ Invalid code. Please check your entry and try again.',
        used_code:
            '⚠️ This access code has already been activated and cannot be reused.',
        success: (endDate: string, uniqueLink: string) =>
            `🎉 Success! Your 6-month trial access has been unlocked.\n\n` +
            `📅 Access Expires on: ${endDate}\n\n` +
            `🔗 Here is your personal club entry link:\n${uniqueLink}\n\n` +
            `⚠️ Note: This link is highly secure, works exactly ONCE, and expires in 24 hours. Do not share it!`,
        error: '💥 An internal server error occurred while processing your code. Please try again shortly.',
        warning_notification:
            '⚠️ **Subscription Warning:** Your 6-month trial access to the BOIKONIQ Club will expire in **24 hours**. If you wish to renew your access, please prepare a new activation code!',
        expired_notification:
            '🚫 **Access Expired:** Your 6-month access has officially ended, and you have been removed from the channel. Thank you for being a part of the BOIKONIQ Club! If you obtain a new code, run /start to reactivate.',
        renew_subscription_button: '🔄 Renew Subscription',
        subscription_tier_1: '3 Months ($15)',
        subscription_tier_2: '6 Months ($25)',
        subscription_tier_3: '1 Year ($45)',
        choose_subscription_plan:
            '💎 **Select a subscription tier to continue:**',
        subscription_tier_1_generating: '💳 3-Month payment link generating...',
        subscription_tier_2_generating: '💳 6-Month payment link generating...',
        subscription_tier_3_generating: '💳 1-Year payment link generating...',
    },
    uk: {
        welcome:
            '👋 Ласкаво просимо до BOIKONIQ Club Bot! Будь ласка, оберіть мову, щоб продовжити:',
        language_selected: 'Обрано українську мову!',
        invalid_user_profile:
            'Упс, щось пішло не так... Я не можу верифікувати ваш телеграм профіль',
        prompt_code:
            '🎯 Будь ласка, надішліть ваш код доступу, щоб розблокувати підписку.',
        verifying_code:
            '🔄 Перевіряю ваш код та готую унікальне посилання до каналу...',
        invalid_code:
            '❌ Невірний код. Перевірте правильність і спробуйте ще раз.',
        used_code:
            '⚠️ Цей код вже було використано і не може перевикористовуватись.',
        success: (endDate: string, uniqueLink: string) =>
            `🎉 Успішно! Ваш 6-місячний пробний доступ розблоковано.\n\n` +
            `📅 Термін дії доступу закінчується: ${endDate}\n\n` +
            `🔗 Ось ваше персональне посилання для входу в клуб:\n${uniqueLink}\n\n` +
            `⚠️ Примітка: Це посилання є високозахищеним, діє лише ОДИН РАЗ і згорить через 24 години. Не діліться ним!`,
        error: '💥 Під час обробки вашого коду сталася внутрішня помилка сервера. Будь ласка, спробуйте ще раз пізніше.',
        warning_notification:
            '⚠️ **Попередження про підписку:** Ваш 6-місячний пробний доступ до клубу BOIKONIQ закінчується через **24 години**. Якщо ви бажаєте продовжити доступ, будь ласка, підготуйте новий код активації!',
        expired_notification:
            '🚫 **Доступ закінчився:** Термін дії вашого 6-місячного доступу офіційно завершився, і вас було видалено з каналу. Дякуємо, що були з нами в клубу BOIKONIQ! Якщо ви отримаєте новий код, надішліть /start для реактивації.',
        renew_subscription_button: '🔄 Продовжити підписку',
        subscription_tier_1: '3 Місяці ($15)',
        subscription_tier_2: '6 Місяців ($25)',
        subscription_tier_3: '1 Рік ($45)',
        choose_subscription_plan:
            '💎 **Оберіть тарифний план для продовження:**',
        subscription_tier_1_generating:
            '💳 Оплата за 3 місяці підключається...',
        subscription_tier_2_generating:
            '💳 Оплата за 6 місяців підключається...',
        subscription_tier_3_generating: '💳 Оплата за 1 рік підключається...',
    },
};

export type Language = 'en' | 'uk';
