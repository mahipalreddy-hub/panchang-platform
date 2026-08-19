# Architecture Trade-offs & SEO Strategy

## 1. Incremental Static Regeneration (ISR) vs Pure SSG vs SSR

| Strategy | Performance | Reindexing Speed | Build Time | Storage & Scale | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Pure SSG (Static Site Gen)** | Instant (Edge HTML) | Slow (requires full build) | Extremely Slow (50 cities × 365 days = 18,250 pages to build) | High static artifacts | ❌ Avoid for full multi-city years |
| **Pure SSR (Server Side Render)** | Moderate (Compute per request) | Real-time | Instant | High compute costs | ❌ Avoid for Googlebot crawler scale |
| **SSG + ISR (`revalidate: 86400`)** | Instant (Edge Cached) | Automatic on first hit after TTL | Fast (pre-render only current + next day) | Minimal | ✅ **Adopted Strategy** |

### Why ISR is the Optimal Choice for Panchang SEO:
1. **Instant Response Times**: Googlebot receives edge-cached HTML (< 50ms) containing full semantic text and structured JSON-LD schemas.
2. **Infinite Scalability**: Historical dates and future dates beyond 60 days are generated on-demand upon first crawl and cached without bloating CI build times.
3. **Automatic Daily Refresh**: With `revalidate: 86400`, as new panchang data lands, pages automatically re-render and serve updated data seamlessly.

---

## 2. Headless REST API vs GraphQL

- **Why Custom REST Endpoints were Chosen**:
  - **Clean, Deterministic URL Contracts**: Endpoints like `GET /wp-json/custom/v1/panchang/delhi/2026-08-19` are easily cached at CDN/Varnish edge layers.
  - **Zero Payload Overhead**: Custom endpoints return exact JSON contracts without heavy GraphQL query parsers on constrained mobile connections.
  - **Simple Ingestion**: Batch writes (`POST /panchang/batch`) map directly to transactional bulk inserts.

---

## 3. High-Precision Ephemeris Engine vs External API Dependency

- **Problem**: Depending on 3rd-party astrology APIs introduces rate limits, subscription fees, network latency, and downtime risks.
- **Solution**: The platform includes `@panchang/astro-core`, implementing pure mathematical Jean Meeus algorithms with Lahiri Ayanamsha (Chitra Paksha).
- **Benefit**:
  - **Zero Cost**: Independent of external paid APIs.
  - **Deterministic Speed**: Computations complete in < 2ms.
  - **Offline-First**: Mobile apps continue computing full panchang, Choghadiya, and Muhurats even when completely disconnected from cellular networks.