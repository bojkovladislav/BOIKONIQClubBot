import { bot } from './bot/bot';

async function startServer() {
    try {
        console.log('--- Starting Telegram Bot ---');

        bot.start({
            onStart: (botInfo) => {
                console.log(
                    `Bot is successfully running as @${botInfo.username}`,
                );
            },
        });
    } catch (error) {
        console.error('Failed to start the application:', error);

        process.exit(1);
    }
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();
