export const translations = {
    en: {
        welcome:
            '👋 Welcome to the BOIKONIQ Club Bot! Please choose your language to continue:',
        language_selected: 'English selected!',
        invalid_user_profile:
            'Упс, щось пішло не так... Я не можу верифікувати ваш телеграм профіль',
        prompt_code:
            '🎯 Please send your 8-digit access code to unlock your club membership.',
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
    },
    uk: {
        welcome:
            '👋 Ласкаво просимо до BOIKONIQ Club Bot! Будь ласка, оберіть мову, щоб продовжити:',
        language_selected: 'Обрано українську мову!',
        invalid_user_profile:
            'Упс, щось пішло не так... Я не можу верифікувати ваш телеграм профіль',
        prompt_code:
            '🎯 Будь ласка, надішліть ваш 8-значний код доступу, щоб розблокувати підписку.',
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
    },
};

export type Language = 'en' | 'uk';
