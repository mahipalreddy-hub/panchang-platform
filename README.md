# Vedic Panchang & Muhurat Finder Platform

> A full-stack Vedic astrology platform powering Web, Android, and iOS applications from a unified monorepo and headless WordPress backend.

---

## 🌟 Platform Overview

- **Headless WordPress Backend**: Admin-first headless CMS with Custom Post Types (`panchang_entry`, `muhurat_type`, `festival`), ACF Pro fields, and dedicated REST API endpoints (`/wp-json/custom/v1/*`).
- **Astronomical Calculation Engine (`@panchang/astro-core`)**: Pure mathematical implementation of Jean Meeus ephemeris with Lahiri Ayanamsha (Chitra Paksha) computing the 5 Panchang limbs, Rahu Kalam, Yamaganda, Gulika, Abhijit Muhurat, and Day/Night Choghadiyas.
- **Next.js Web Application (`apps/web`)**: Next.js 14 App Router with Incremental Static Regeneration (ISR), automated XML sitemaps across 50+ Indian cities, rich JSON-LD structured schemas (`Event`, `FAQPage`, `BreadcrumbList`), and an elegant Indian temple aesthetic.
- **Expo React Native Mobile App (`apps/mobile`)**: Android & iOS app with instant offline caching (`AsyncStorage`), 6:00 AM daily panchang push notifications, Rahu Kalam alerts, and deep linking (`panchang://`).
- **Data Ingestion Service (`services/data-ingestion`)**: Scheduled cron job computing rolling panchang horizons and pushing batch records to WordPress.

---

## 📁 Monorepo Structure

```
panchang-platform/
├── apps/
│   ├── web/                    # Next.js 14 App Router Web App
│   └── mobile/                 # React Native / Expo Mobile App
├── packages/
│   ├── types/                  # Shared TypeScript interfaces & API contracts
│   ├── astro-core/             # Astronomical Ephemeris & Panchang calculation algorithms
│   ├── api-client/             # Isomorphic API client with offline calculation fallback
│   └── ui/                     # Vedic color palette, tokens, formatters & iconography
├── backend/
│   └── wordpress/              # Headless WordPress Custom Plugin (panchang-core)
├── services/
│   └── data-ingestion/         # Automated Node.js batch ingestion & cron runner
├── docs/                       # Comprehensive setup & deployment manuals
│   ├── wordpress-setup.md
│   ├── deployment-vercel.md
│   ├── deployment-expo-eas.md
│   └── seo-and-tradeoffs.md
├── package.json                # Turborepo root workspaces configuration
└── turbo.json                  # Turborepo pipeline configuration
```

---

## 🚀 Quick Start

### 1. Install Monorepo Dependencies
```bash
npm install
```

### 2. Run the Next.js Web App
```bash
npx turbo run dev --filter=@panchang/web
# Web app runs at http://localhost:3000
```

### 3. Run the React Native Mobile App
```bash
npx turbo run start --filter=@panchang/mobile
# Opens Expo Developer Tools for iOS Simulator & Android Emulator
```

### 4. Run Astronomical Ingestion
```bash
cd services/data-ingestion
npm run ingest
```

---

## 🏙️ How to Add a New City

1. Open `packages/astro-core/src/cities.ts`.
2. Add your city object to `INDIAN_CITIES`:
   ```typescript
   {
     slug: 'madurai',
     name: 'Madurai',
     nameDevanagari: 'मदुरै',
     state: 'Tamil Nadu',
     latitude: 9.9252,
     longitude: 78.1198,
     timezone: 'Asia/Kolkata',
     elevationMeters: 101,
     isMajorHub: false,
     popularKeywords: ['madurai panchangam', 'meenakshi temple muhurat']
   }
   ```
3. Run `npm run ingest` to automatically calculate and index panchang data for the new city across Web, Mobile, and WordPress.

---

## 💍 How to Add a New Muhurat Type

1. Add the category identifier in `packages/types/src/muhurat.ts` (e.g. `'upanayana'`).
2. Define astrological rules & descriptions in `packages/astro-core/src/muhurat-evaluator.ts` under `MUHURAT_EVENTS_CATALOG`.
3. The interactive Muhurat Finder on web and mobile will automatically render the new category tab, auspicious scoring, and date matches.

---

## 📖 Deployment Documentation

- [Headless WordPress Configuration](docs/wordpress-setup.md)
- [Vercel Web ISR Deployment](docs/deployment-vercel.md)
- [Expo EAS Mobile App Build Guide](docs/deployment-expo-eas.md)
- [SEO Strategy & Architecture Trade-offs](docs/seo-and-tradeoffs.md)