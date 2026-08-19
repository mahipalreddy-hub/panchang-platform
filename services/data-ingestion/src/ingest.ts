import { INDIAN_CITIES, calculatePanchang } from '@panchang/astro-core';
import { PanchangData } from '@panchang/types';
import { WordPressPusher } from './wp-pusher';

export async function runIngestion(daysAhead: number = 30): Promise<void> {
  console.log(`====================================================`);
  console.log(`   VEDIC PANCHANG ASTRONOMICAL INGESTION ENGINE     `);
  console.log(`====================================================`);
  console.log(`Target Cities: ${INDIAN_CITIES.length} major Indian locations`);
  console.log(`Date Horizon: Next ${daysAhead} days starting today`);

  const today = new Date();
  const allEntries: PanchangData[] = [];

  for (let d = 0; d < daysAhead; d++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + d);
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
    const dd = String(targetDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    for (const city of INDIAN_CITIES) {
      const panchang = calculatePanchang(city.slug, dateStr);
      allEntries.push(panchang);
    }
  }

  console.log(`Total generated Panchang entries: ${allEntries.length}`);

  // Push to WordPress in chunked batches of 50
  const pusher = new WordPressPusher({
    wpEndpoint: process.env.WP_REST_URL || 'https://cms.vedicpanchang.internal/wp-json/custom/v1',
    apiSecret: process.env.PANCHANG_BATCH_SECRET || 'vedic_panchang_secret_key_2026'
  });

  const chunkSize = 50;
  for (let i = 0; i < allEntries.length; i += chunkSize) {
    const chunk = allEntries.slice(i, i + chunkSize);
    console.log(`Ingesting chunk ${Math.floor(i / chunkSize) + 1} / ${Math.ceil(allEntries.length / chunkSize)} (${chunk.length} entries)...`);
    await pusher.pushBatch(chunk);
  }

  console.log(`✅ Ingestion process finished successfully!`);
}

// Execute standalone when run directly
if (require.main === module) {
  runIngestion(30).catch(console.error);
}