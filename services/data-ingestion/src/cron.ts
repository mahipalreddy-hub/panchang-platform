import cron from 'node-cron';
import { runIngestion } from './ingest';

console.log('⏰ Starting Panchang Ingestion Cron Daemon...');
console.log('Schedule: Every midnight at 00:05 AM IST (05 0 * * *)');

// Runs daily at 00:05 AM
cron.schedule('5 0 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Triggering scheduled daily Panchang computation & WordPress ingestion...`);
  try {
    // Ingest the next 60 rolling days
    await runIngestion(60);
  } catch (err) {
    console.error('Scheduled ingestion run failed:', err);
  }
});