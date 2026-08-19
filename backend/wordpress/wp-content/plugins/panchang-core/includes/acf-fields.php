<?php
if (!defined('ABSPATH')) exit;

/**
 * Register ACF Pro Field Groups programmatically for structured Panchang, Muhurat, and Festivals.
 * If ACF Pro is not installed, custom meta handlers are automatically registered as fallbacks.
 */
add_action('acf/init', function() {
    if (!function_exists('acf_add_local_field_group')) return;

    // 1. Panchang Entry Fields
    acf_add_local_field_group([
        'key' => 'group_panchang_entry_fields',
        'title' => 'Panchang Astronomical Details',
        'fields' => [
            ['key' => 'field_panchang_date', 'label' => 'Date (YYYY-MM-DD)', 'name' => 'entry_date', 'type' => 'text', 'required' => 1],
            ['key' => 'field_panchang_city', 'label' => 'City Slug', 'name' => 'city_slug', 'type' => 'text', 'required' => 1],
            ['key' => 'field_panchang_tithi_name', 'label' => 'Tithi Name', 'name' => 'tithi_name', 'type' => 'text'],
            ['key' => 'field_panchang_tithi_paksha', 'label' => 'Paksha', 'name' => 'tithi_paksha', 'type' => 'select', 'choices' => ['Shukla' => 'Shukla', 'Krishna' => 'Krishna']],
            ['key' => 'field_panchang_tithi_end', 'label' => 'Tithi End Time', 'name' => 'tithi_end_time', 'type' => 'text'],
            ['key' => 'field_panchang_nakshatra_name', 'label' => 'Nakshatra Name', 'name' => 'nakshatra_name', 'type' => 'text'],
            ['key' => 'field_panchang_nakshatra_pada', 'label' => 'Nakshatra Pada', 'name' => 'nakshatra_pada', 'type' => 'number', 'min' => 1, 'max' => 4],
            ['key' => 'field_panchang_yoga_name', 'label' => 'Yoga Name', 'name' => 'yoga_name', 'type' => 'text'],
            ['key' => 'field_panchang_karana_name', 'label' => 'Karana Name', 'name' => 'karana_name', 'type' => 'text'],
            ['key' => 'field_panchang_sunrise', 'label' => 'Sunrise Time', 'name' => 'sunrise_time', 'type' => 'text'],
            ['key' => 'field_panchang_sunset', 'label' => 'Sunset Time', 'name' => 'sunset_time', 'type' => 'text'],
            ['key' => 'field_panchang_rahu_start', 'label' => 'Rahu Kalam Start', 'name' => 'rahu_start', 'type' => 'text'],
            ['key' => 'field_panchang_rahu_end', 'label' => 'Rahu Kalam End', 'name' => 'rahu_end', 'type' => 'text'],
            ['key' => 'field_panchang_abhijit_start', 'label' => 'Abhijit Muhurat Start', 'name' => 'abhijit_start', 'type' => 'text'],
            ['key' => 'field_panchang_abhijit_end', 'label' => 'Abhijit Muhurat End', 'name' => 'abhijit_end', 'type' => 'text'],
            ['key' => 'field_panchang_payload_json', 'label' => 'Full Computed JSON Payload', 'name' => 'payload_json', 'type' => 'textarea', 'instructions' => 'Contains complete astronomical structure including Choghadiya, planetary positions, and auspicious yogas.']
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'panchang_entry']]
        ]
    ]);
});