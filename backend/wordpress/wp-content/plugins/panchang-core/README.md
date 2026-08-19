# Panchang Core WordPress Plugin

A headless WordPress plugin engineered for the Daily Panchang & Muhurat Finder platform.

## Features
- **Custom Post Types**: `panchang_entry`, `muhurat_type`, `festival`
- **ACF Pro Field Groups**: Programmatic export included
- **Dedicated REST API Endpoints**:
  - `GET /wp-json/custom/v1/panchang/{city}/{date}`
  - `GET /wp-json/custom/v1/muhurat?type={type}&from={date}&to={date}`
  - `GET /wp-json/custom/v1/festivals?year={year}`
  - `GET /wp-json/custom/v1/cities`
  - `POST /wp-json/custom/v1/panchang/batch` (Protected with App Passwords / API Secret Header)
- **High performance transient caching** (24h TTL)

## Installation
1. Copy `panchang-core` folder to `wp-content/plugins/`.
2. Activate via WP Admin -> Plugins.
3. Set Permalinks to **Post name** under Settings -> Permalinks.
4. Retrieve the auto-generated Batch Secret from `wp_options` (`panchang_batch_ingest_secret`) or configure WordPress Application Passwords under Users -> Profile.