import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

// Initialize the PostgreSQL Connection Pool
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seeding with PG Driver Adapter...');

    const testCodes = ['TEST-6666', 'TEST-5555', 'TEST-4444'];
    const seededCodes = [];

    for (const codeString of testCodes) {
        const record = await prisma.bookCode.upsert({
            where: { code: codeString },
            update: {},
            create: {
                code: codeString,
                status: 'UNUSED',
            },
        });
        seededCodes.push(record);
    }

    console.log('✅ Database successfully seeded with test codes via Pool!');
    console.log({ seededCodes });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error('❌ Error during seeding operation:', e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
