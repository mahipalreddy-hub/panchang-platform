<?php
if (!defined('ABSPATH')) exit;

function panchang_register_cpts_and_taxonomies() {
    // 1. CPT: Panchang Entry
    register_post_type('panchang_entry', [
        'labels' => [
            'name' => __('Panchang Entries', 'panchang-core'),
            'singular_name' => __('Panchang Entry', 'panchang-core'),
            'add_new' => __('Add Panchang Entry', 'panchang-core'),
            'add_new_item' => __('Add New Panchang Entry', 'panchang-core'),
            'edit_item' => __('Edit Panchang Entry', 'panchang-core'),
            'all_items' => __('All Daily Panchang Records', 'panchang-core')
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'panchang-records',
        'has_archive' => false,
        'menu_icon' => 'dashicons-sun',
        'supports' => ['title', 'custom-fields', 'revisions'],
        'show_in_menu' => true
    ]);

    // 2. CPT: Muhurat Type & Guides
    register_post_type('muhurat_type', [
        'labels' => [
            'name' => __('Muhurat Types', 'panchang-core'),
            'singular_name' => __('Muhurat Type', 'panchang-core'),
            'add_new' => __('Add Muhurat Type', 'panchang-core'),
            'edit_item' => __('Edit Muhurat Type', 'panchang-core'),
            'all_items' => __('All Muhurat Guides', 'panchang-core')
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'muhurats',
        'has_archive' => false,
        'menu_icon' => 'dashicons-clock',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields']
    ]);

    // 3. CPT: Festivals & Vrats
    register_post_type('festival', [
        'labels' => [
            'name' => __('Festivals & Vrats', 'panchang-core'),
            'singular_name' => __('Festival', 'panchang-core'),
            'add_new' => __('Add Festival', 'panchang-core'),
            'edit_item' => __('Edit Festival', 'panchang-core'),
            'all_items' => __('All Festivals & Vrats', 'panchang-core')
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'festivals',
        'has_archive' => false,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields']
    ]);

    // 4. Taxonomy: City Location
    register_taxonomy('city_location', ['panchang_entry', 'muhurat_type'], [
        'labels' => [
            'name' => __('Cities', 'panchang-core'),
            'singular_name' => __('City', 'panchang-core'),
            'all_items' => __('All Cities', 'panchang-core'),
            'add_new_item' => __('Add New City', 'panchang-core')
        ],
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
        'rewrite' => ['slug' => 'city']
    ]);
}
add_action('init', 'panchang_register_cpts_and_taxonomies');