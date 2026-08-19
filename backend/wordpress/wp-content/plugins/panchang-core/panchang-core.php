<?php
/**
 * Plugin Name: Vedic Panchang & Muhurat Core (Headless Engine)
 * Plugin URI: https://vedicpanchang.internal
 * Description: High-performance Headless WordPress engine providing Custom Post Types, ACF Fields, and dedicated REST API endpoints for Daily Panchang, Muhurat Finder, Festival Calendar, and City Astrological Data.
 * Version: 1.0.0
 * Author: Vedic Astrology Platform Engineering
 * Author URI: https://vedicpanchang.internal
 * License: GPL-2.0+
 * Text Domain: panchang-core
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('PANCHANG_CORE_VERSION', '1.0.0');
define('PANCHANG_CORE_DIR', plugin_dir_path(__FILE__));
define('PANCHANG_CORE_URL', plugin_dir_url(__FILE__));

// Require Core Subsystems
require_once PANCHANG_CORE_DIR . 'includes/helpers.php';
require_once PANCHANG_CORE_DIR . 'includes/cpt-registry.php';
require_once PANCHANG_CORE_DIR . 'includes/acf-fields.php';
require_once PANCHANG_CORE_DIR . 'includes/rest-api.php';

/**
 * Plugin Activation Hook
 */
register_activation_hook(__FILE__, function() {
    // Flush rewrite rules for custom post types and taxonomies
    panchang_register_cpts_and_taxonomies();
    flush_rewrite_rules();

    // Default configuration options
    if (!get_option('panchang_api_cache_ttl')) {
        update_option('panchang_api_cache_ttl', 86400); // 24 hours
    }
    if (!get_option('panchang_batch_ingest_secret')) {
        update_option('panchang_batch_ingest_secret', wp_generate_password(32, true, true));
    }
});

/**
 * Plugin Deactivation Hook
 */
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

/**
 * Headless Optimization: Disable frontend theme template rendering if not admin
 */
add_action('template_redirect', function() {
    if (!is_admin() && !is_user_logged_in() && !str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/wp-json/')) {
        // In headless mode, send friendly API redirect or lightweight JSON status
        wp_send_json([
            'status' => 'active',
            'platform' => 'Headless Vedic Panchang CMS',
            'endpoints' => [
                'panchang' => rest_url('custom/v1/panchang/{city}/{date}'),
                'muhurat' => rest_url('custom/v1/muhurat?type={type}&from={date}&to={date}'),
                'festivals' => rest_url('custom/v1/festivals?year={year}'),
                'cities' => rest_url('custom/v1/cities'),
                'batch_ingest' => rest_url('custom/v1/panchang/batch')
            ],
            'timestamp' => current_time('mysql')
        ], 200);
        exit;
    }
});