# Data Ingestion Service

Automated Vedic astronomical calculation & batch synchronization engine for WordPress.

## How It Works
1. Runs astronomical calculation algorithms (Sun/Moon ephemeris, Lahiri Ayanamsha, 5 limbs of Panchang, Choghadiya, Rahu Kalam) for all 50+ Indian cities.
2. Formats records into validated TypeScript JSON payloads.
3. Batch posts entries into WordPress via `POST /wp-json/custom/v1/panchang/batch` with authentication.
4. Auto-invalidates WordPress transient caches.

## Execution
```bash
# Run one-off 30-day ingestion
npm run ingest

# Start background cron daemon (00:05 AM daily)
npm run cron
```