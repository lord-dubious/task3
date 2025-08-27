import PgBoss from 'pg-boss';
import dotenv from 'dotenv';
import { registerJobs } from './workers';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const boss = new PgBoss({ connectionString: process.env.DATABASE_URL });

async function startBoss() {
  await boss.start();
  await registerJobs(boss);
}

startBoss().catch((err) => {
   
  console.error('Failed to start PgBoss', err);
  process.exit(1);
});

export default boss;

