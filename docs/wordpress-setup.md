# Headless WordPress Setup Guide

This guide walks through configuring headless WordPress as the central CMS and REST API backend for the Vedic Panchang & Muhurat Platform.

---

## 1. Prerequisites & Hosting Requirements
- **PHP Version**: PHP 8.1 or higher (PHP 8.2/8.3 recommended).
- **MySQL / MariaDB**: MySQL 8.0+ or MariaDB 10.6+.
- **Web Server**: Nginx or Apache with `mod_rewrite` enabled.
- **SSL Certificate**: HTTPS is mandatory for WordPress Application Passwords and secure REST API transport.

---

## 2. Plugin Installation & Activation
1. Copy the plugin directory `backend/wordpress/wp-content/plugins/panchang-core` into your WordPress installation's `wp-content/plugins/` folder.
2. In the WordPress Admin dashboard, navigate to **Plugins -> Installed Plugins**.
3. Locate **Vedic Panchang & Muhurat Core (Headless Engine)** and click **Activate**.
4. Navigate to **Settings -> Permalinks** and ensure **Post name** (`/%postname%/`) is selected. Click **Save Changes** to flush rewrite rules.

---

## 3. Configuring Authentication for Data Ingestion
The scheduled Node.js ingestion script sends bulk computed panchang payloads to `POST /wp-json/custom/v1/panchang/batch`.

You can authenticate using either of the following two mechanisms:

### Method A: Shared Secret Header (Fastest & Recommended for Cron)
1. When `panchang-core` activates, it generates a 32-character secret stored in `wp_options` under `panchang_batch_ingest_secret`.
2. Retrieve this key or set a custom one using WP-CLI:
   ```bash
   wp option get panchang_batch_ingest_secret
   # Or set a custom key:
   wp option update panchang_batch_ingest_secret "your_secure_random_batch_secret_2026"
   ```
3. Provide this key in your ingestion service environment:
   ```env
   PANCHANG_BATCH_SECRET=your_secure_random_batch_secret_2026
   ```

### Method B: WordPress Application Passwords
1. Go to **Users -> Profile** in WP Admin.
2. Scroll down to **Application Passwords**.
3. Enter `Panchang Ingestion Cron` in the name field and click **Add New Application Password**.
4. Copy the generated 24-character token and set the environment variables:
   ```env
   WP_APP_USER=admin
   WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
   ```

---

## 4. Verifying REST API Endpoints

Test the custom endpoints via `curl` or browser:
```bash
# 1. Test Daily Panchang for a City & Date
curl -X GET https://your-wp-domain.com/wp-json/custom/v1/panchang/hyderabad/2026-08-19

# 2. Test Muhurat Filter
curl -X GET "https://your-wp-domain.com/wp-json/custom/v1/muhurat?type=wedding&from=2026-08-19&to=2026-10-19"

# 3. Test Festival Calendar
curl -X GET "https://your-wp-domain.com/wp-json/custom/v1/festivals?year=2026"
```