import { fileURLToPath, pathToFileURL } from 'node:url';
import { bot } from './bot/bot';
import path from 'path';
import Bree from 'bree';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const absoluteJobPath = path.join(__dirname, 'jobs', 'expire-users.ts');
const jobFileUrl = pathToFileURL(absoluteJobPath).href;

const bree = new Bree({
    root: false,
    jobs: [
        {
            name: 'expire-users',
            interval: 'at 12:00 am',
            // interval: '1m', // for dev purposes
            path:
                process.env['NODE_ENV'] === 'production'
                    ? path.join(__dirname, 'jobs', 'expire-users.js')
                    : `import('tsx/esm/api').then(({ register }) => { register(); import('${jobFileUrl}'); })`,
            worker: {
                eval: process.env['NODE_ENV'] !== 'production',
            },
        },
    ],
});

async function startServer() {
    try {
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

await bree.start();

startServer();
