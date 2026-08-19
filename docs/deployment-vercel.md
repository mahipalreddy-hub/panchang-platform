# Next.js Web App Deployment on Vercel

The web application (`apps/web`) is optimized for deployment on Vercel with Incremental Static Regeneration (ISR), automated sitemap generation, and JSON-LD structured data.

---

## 1. Vercel Project Configuration

1. Connect your Git repository to **Vercel**.
2. Set the **Root Directory** to `apps/web` (or enable Turborepo build workspace).
3. Set the **Framework Preset** to `Next.js`.
4. Build & Output Settings:
   - **Build Command**: `cd ../.. && npx turbo run build --filter=@panchang/web`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

---

## 2. Environment Variables

Configure the following environment variables in the Vercel Project Settings:

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Headless WordPress REST API base URL | `https://cms.yourdomain.com/wp-json/custom/v1` |
| `NEXT_PUBLIC_SITE_URL` | Production website canonical URL | `https://www.vedicpanchang.com` |
| `PANCHANG_BATCH_SECRET` | Secret token for on-demand ISR revalidation | `your_secure_secret_token` |

---

## 3. SEO & Sitemaps Verification
- Sitemaps are dynamically generated at `https://yourdomain.com/sitemap.xml`.
- Search bots automatically discover thousands of city + date URLs.
- To verify Rich Snippets, submit any city/date page (e.g. `/panchang/mumbai/2026-08-19`) to Google Rich Results Test to confirm valid `Event`, `FAQPage`, and `BreadcrumbList` schemas.