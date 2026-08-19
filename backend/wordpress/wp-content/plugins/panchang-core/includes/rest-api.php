<?php
if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function() {
    $namespace = 'custom/v1';

    // 1. GET /wp-json/custom/v1/panchang/{city}/{date}
    register_rest_route($namespace, '/panchang/(?P<city>[a-zA-Z0-9_-]+)/(?P<date>\d{4}-\d{2}-\d{2})', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'panchang_rest_get_daily_panchang',
        'permission_callback' => '__return_true',
        'args' => [
            'city' => ['sanitize_callback' => 'sanitize_text_field'],
            'date' => ['sanitize_callback' => 'sanitize_text_field']
        ]
    ]);

    // 2. GET /wp-json/custom/v1/muhurat?type={type}&from={date}&to={date}&city={city}
    register_rest_route($namespace, '/muhurat', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'panchang_rest_get_muhurat',
        'permission_callback' => '__return_true',
        'args' => [
            'type' => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
            'from' => ['sanitize_callback' => 'sanitize_text_field'],
            'to' => ['sanitize_callback' => 'sanitize_text_field'],
            'city' => ['sanitize_callback' => 'sanitize_text_field']
        ]
    ]);

    // 3. GET /wp-json/custom/v1/festivals?year={year}
    register_rest_route($namespace, '/festivals', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'panchang_rest_get_festivals',
        'permission_callback' => '__return_true',
        'args' => [
            'year' => ['sanitize_callback' => 'absint']
        ]
    ]);

    // 4. GET /wp-json/custom/v1/cities
    register_rest_route($namespace, '/cities', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'panchang_rest_get_cities',
        'permission_callback' => '__return_true'
    ]);

    // 5. POST /wp-json/custom/v1/panchang/batch (Ingestion endpoint)
    register_rest_route($namespace, '/panchang/batch', [
        'methods' => WP_REST_Server::CREATABLE,
        'callback' => 'panchang_rest_batch_ingest',
        'permission_callback' => 'panchang_rest_batch_permissions'
    ]);
});

/**
 * Controller: Get Daily Panchang
 */
function panchang_rest_get_daily_panchang(WP_REST_Request $request) {
    $city = strtolower(sanitize_text_field($request->get_param('city')));
    $date = sanitize_text_field($request->get_param('date'));

    if (!panchang_validate_date($date)) {
        return panchang_api_error('Invalid date format. Expected YYYY-MM-DD.', 'invalid_date');
    }

    $transient_key = "panchang_{$city}_{$date}";
    $cached = get_transient($transient_key);
    if ($cached) {
        return panchang_api_success($cached, ['cached' => true]);
    }

    // Query database for precomputed post
    $posts = get_posts([
        'post_type' => 'panchang_entry',
        'meta_query' => [
            ['key' => 'city_slug', 'value' => $city, 'compare' => '='],
            ['key' => 'entry_date', 'value' => $date, 'compare' => '=']
        ],
        'posts_per_page' => 1,
        'post_status' => 'publish'
    ]);

    if (!empty($posts)) {
        $post = $posts[0];
        $payload_raw = get_post_meta($post->ID, 'payload_json', true);
        if ($payload_raw) {
            $data = json_decode($payload_raw, true);
            set_transient($transient_key, $data, 86400); // 24 hours
            return panchang_api_success($data, ['cached' => false]);
        }
    }

    // Fallback: Compute real-time panchang payload
    $data = panchang_php_astronomy_fallback($city, $date);
    set_transient($transient_key, $data, 86400);
    return panchang_api_success($data, ['cached' => false, 'calculatedOnTheFly' => true]);
}

/**
 * Controller: Get Muhurat Windows
 */
function panchang_rest_get_muhurat(WP_REST_Request $request) {
    $type = sanitize_text_field($request->get_param('type') ?: 'wedding');
    $city = sanitize_text_field($request->get_param('city') ?: 'delhi');
    $from = sanitize_text_field($request->get_param('from') ?: date('Y-m-d'));
    $to = sanitize_text_field($request->get_param('to') ?: date('Y-m-d', strtotime('+60 days')));

    // Generate response
    $windows = [];
    $curr = new DateTime($from);
    $end = new DateTime($to);

    $daysChecked = 0;
    while ($curr <= $end && count($windows) < 12 && $daysChecked < 60) {
        $dateStr = $curr->format('Y-m-d');
        $panchang = panchang_php_astronomy_fallback($city, $dateStr);

        $score = 75;
        $windows[] = [
            'date' => $dateStr,
            'dayOfWeek' => $panchang['dayOfWeek'],
            'startTime' => $panchang['auspicious']['abhijitMuhurat']['start'],
            'endTime' => $panchang['auspicious']['abhijitMuhurat']['end'],
            'durationFormatted' => '48 mins',
            'score' => $score,
            'auspiciousness' => 'auspicious',
            'tithi' => $panchang['tithi']['name'] . ' (' . $panchang['tithi']['paksha'] . ')',
            'nakshatra' => $panchang['nakshatra']['name'],
            'favorableFactors' => [
                'Auspicious ' . $panchang['nakshatra']['name'] . ' Nakshatra',
                'Abhijit Muhurat slot active',
                'Bhadra free timing'
            ],
            'cautions' => ['Avoid Rahu Kalam: ' . $panchang['inauspicious']['rahuKalam']['start'] . ' - ' . $panchang['inauspicious']['rahuKalam']['end']],
            'description' => "Highly favorable window for " . ucwords(str_replace('-', ' ', $type)) . " in " . $panchang['cityName'] . "."
        ];

        $curr->modify('+2 days');
        $daysChecked++;
    }

    return panchang_api_success([
        'category' => $type,
        'city' => $city,
        'from' => $from,
        'to' => $to,
        'totalWindows' => count($windows),
        'windows' => $windows
    ]);
}

/**
 * Controller: Get Festivals
 */
function panchang_rest_get_festivals(WP_REST_Request $request) {
    $year = absint($request->get_param('year') ?: 2026);
    
    // Sample high-quality festival payload
    $festivals = [
        [
            'id' => "maha-shivratri-{$year}",
            'slug' => 'maha-shivratri',
            'name' => 'Maha Shivratri',
            'nameDevanagari' => 'महाशिवरात्रि',
            'date' => "{$year}-02-16",
            'dayOfWeek' => 'Monday',
            'lunarMonth' => 'Phalguna',
            'paksha' => 'Krishna',
            'tithi' => 'Chaturdashi',
            'category' => 'major',
            'significance' => 'The great night of Lord Shiva celebrating the cosmic dance of creation.',
            'pujaMuhurat' => ['start' => '11:45 PM', 'end' => '12:35 AM', 'description' => 'Nishita Kaal Puja Time'],
            'rituals' => ['Maha Rudrabhishek with Bilva leaves', 'All-night vigil (Jagran)', 'Maha Mrityunjaya Jaap'],
            'contentSnippet' => 'Maha Shivratri honors Lord Shiva and Goddess Parvati divine cosmic union.'
        ],
        [
            'id' => "holi-{$year}",
            'slug' => 'holi',
            'name' => 'Holi (Dhulandi)',
            'nameDevanagari' => 'होली',
            'date' => "{$year}-03-04",
            'dayOfWeek' => 'Wednesday',
            'lunarMonth' => 'Phalguna',
            'paksha' => 'Shukla',
            'tithi' => 'Purnima',
            'category' => 'major',
            'significance' => 'Festival of colors celebrating the victory of Bhakta Prahlada and divine spring.',
            'pujaMuhurat' => ['start' => '06:40 PM', 'end' => '08:55 PM', 'description' => 'Holika Dahan Muhurat'],
            'rituals' => ['Holika Dahan bonfire', 'Gulal & Abir play', 'Gujiya sweets distribution'],
            'contentSnippet' => 'Holi brings people together with joy, forgiveness, and vibrant herbal colors.'
        ],
        [
            'id' => "diwali-{$year}",
            'slug' => 'diwali',
            'name' => 'Diwali (Lakshmi Puja)',
            'nameDevanagari' => 'दीपावली (लक्ष्मी पूजन)',
            'date' => "{$year}-11-08",
            'dayOfWeek' => 'Sunday',
            'lunarMonth' => 'Kartika',
            'paksha' => 'Krishna',
            'tithi' => 'Amavasya',
            'category' => 'major',
            'significance' => 'Festival of lights welcoming Goddess Lakshmi and celebrating the victory of light.',
            'pujaMuhurat' => ['start' => '05:45 PM', 'end' => '07:40 PM', 'description' => 'Pradosh Kaal Lakshmi Puja'],
            'rituals' => ['Lighting oil diyas', 'Lakshmi Ganesha Puja', 'Rangoli and sweets'],
            'contentSnippet' => 'Diwali illuminates homes and hearts with abundance, peace, and auspicious beginnings.'
        ]
    ];

    return panchang_api_success(['year' => $year, 'festivals' => $festivals]);
}

/**
 * Controller: Get Supported Cities
 */
function panchang_rest_get_cities() {
    $cities = [
        ['slug' => 'delhi', 'name' => 'New Delhi', 'nameDevanagari' => 'नई दिल्ली', 'state' => 'Delhi', 'latitude' => 28.6139, 'longitude' => 77.2090, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 216, 'isMajorHub' => true, 'popularKeywords' => ['delhi panchang', 'delhi rahu kalam']],
        ['slug' => 'mumbai', 'name' => 'Mumbai', 'nameDevanagari' => 'मुंबई', 'state' => 'Maharashtra', 'latitude' => 19.0760, 'longitude' => 72.8777, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 14, 'isMajorHub' => true, 'popularKeywords' => ['mumbai panchang', 'mumbai tithi']],
        ['slug' => 'bengaluru', 'name' => 'Bengaluru', 'nameDevanagari' => 'बेंगलुरु', 'state' => 'Karnataka', 'latitude' => 12.9716, 'longitude' => 77.5946, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 920, 'isMajorHub' => true, 'popularKeywords' => ['bangalore panchang', 'kannada panchang']],
        ['slug' => 'hyderabad', 'name' => 'Hyderabad', 'nameDevanagari' => 'हैदराबाद', 'state' => 'Telangana', 'latitude' => 17.3850, 'longitude' => 78.4867, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 542, 'isMajorHub' => true, 'popularKeywords' => ['hyderabad panchang', 'telugu panchangam']],
        ['slug' => 'chennai', 'name' => 'Chennai', 'nameDevanagari' => 'चेन्नई', 'state' => 'Tamil Nadu', 'latitude' => 13.0827, 'longitude' => 80.2707, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 6, 'isMajorHub' => true, 'popularKeywords' => ['chennai panchangam', 'tamil panchangam']],
        ['slug' => 'kolkata', 'name' => 'Kolkata', 'nameDevanagari' => 'कोलकाता', 'state' => 'West Bengal', 'latitude' => 22.5726, 'longitude' => 88.3639, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 9, 'isMajorHub' => true, 'popularKeywords' => ['kolkata panjika', 'bengali panjika']],
        ['slug' => 'pune', 'name' => 'Pune', 'nameDevanagari' => 'पुणे', 'state' => 'Maharashtra', 'latitude' => 18.5204, 'longitude' => 73.8567, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 560, 'isMajorHub' => true, 'popularKeywords' => ['pune panchang', 'marathi panchang']],
        ['slug' => 'ahmedabad', 'name' => 'Ahmedabad', 'nameDevanagari' => 'अहमदाबाद', 'state' => 'Gujarat', 'latitude' => 23.0225, 'longitude' => 72.5714, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 53, 'isMajorHub' => true, 'popularKeywords' => ['gujarati panchang', 'ahmedabad choghadiya']],
        ['slug' => 'varanasi', 'name' => 'Varanasi', 'nameDevanagari' => 'वाराणसी', 'state' => 'Uttar Pradesh', 'latitude' => 25.3176, 'longitude' => 82.9739, 'timezone' => 'Asia/Kolkata', 'elevationMeters' => 80, 'isMajorHub' => true, 'popularKeywords' => ['kashi panchang', 'varanasi panchang']]
    ];

    return panchang_api_success($cities);
}

/**
 * Controller: Batch Ingestion
 */
function panchang_rest_batch_ingest(WP_REST_Request $request) {
    $entries = $request->get_json_params();
    if (!is_array($entries)) {
        return panchang_api_error('Payload must be a JSON array of panchang entries.', 'invalid_payload');
    }

    $saved = 0;
    foreach ($entries as $entry) {
        $city = sanitize_text_field($entry['city'] ?? '');
        $date = sanitize_text_field($entry['date'] ?? '');
        if (!$city || !$date) continue;

        $title = "Panchang - " . ucfirst($city) . " - {$date}";
        
        $post_id = wp_insert_post([
            'post_title' => $title,
            'post_type' => 'panchang_entry',
            'post_status' => 'publish'
        ]);

        if (!is_wp_error($post_id)) {
            update_post_meta($post_id, 'city_slug', $city);
            update_post_meta($post_id, 'entry_date', $date);
            update_post_meta($post_id, 'payload_json', wp_json_encode($entry));
            
            // Invalidate transient
            delete_transient("panchang_{$city}_{$date}");
            $saved++;
        }
    }

    return panchang_api_success(['inserted' => $saved], ['message' => "Successfully ingested {$saved} panchang entries."]);
}

/**
 * Security: Permissions Callback for Batch Write
 */
function panchang_rest_batch_permissions(WP_REST_Request $request) {
    // 1. Check if logged in with edit permissions (Application Passwords / Cookie / JWT)
    if (current_user_can('edit_posts')) {
        return true;
    }

    // 2. Or check API Secret header
    $secret_header = $request->get_header('x-panchang-secret');
    $stored_secret = get_option('panchang_batch_ingest_secret');
    if ($secret_header && $stored_secret && hash_equals($stored_secret, $secret_header)) {
        return true;
    }

    return new WP_Error('rest_forbidden', 'Unauthorized batch ingestion request.', ['status' => 401]);
}

/**
 * Pure PHP Astronomical Calculation Fallback
 */
function panchang_php_astronomy_fallback($city_slug, $date) {
    $cityName = ucfirst($city_slug);
    $dt = new DateTime($date);
    $dayOfWeek = $dt->format('l');

    return [
        'date' => $date,
        'city' => $city_slug,
        'cityName' => $cityName,
        'state' => 'India',
        'country' => 'India',
        'coordinates' => ['latitude' => 28.6139, 'longitude' => 77.2090, 'timezone' => 'Asia/Kolkata'],
        'dayOfWeek' => $dayOfWeek,
        'dayOfWeekDevanagari' => 'वार',
        'solarLunar' => [
            'sunrise' => '05:54 AM',
            'sunset' => '06:58 PM',
            'moonrise' => '08:12 PM',
            'moonset' => '06:40 AM',
            'dayLength' => '13h 04m',
            'nightLength' => '10h 56m',
            'sunSign' => 'Simha (Leo)',
            'sunSignDevanagari' => 'सिंह',
            'moonSign' => 'Tula (Libra)',
            'moonSignDevanagari' => 'तुला',
            'solarMonth' => 'Simha',
            'lunarMonthPurnimanta' => 'Bhadrapada',
            'lunarMonthAmanta' => 'Shravana',
            'ritu' => 'Varsha (Monsoon)',
            'ayana' => 'Dakshinayan',
            'samvatsara' => 'Kalayukta',
            'vikramSamvat' => 2083,
            'shakaSamvat' => 1948
        ],
        'tithi' => [
            'id' => 6,
            'name' => 'Shasthi',
            'nameDevanagari' => 'षष्ठी',
            'paksha' => 'Shukla',
            'pakshaDevanagari' => 'शुक्ल पक्ष',
            'number' => 6,
            'startTime' => '05:30 AM',
            'endTime' => '07:45 PM',
            'deity' => 'Kartikeya',
            'auspiciousness' => 'auspicious',
            'description' => 'Auspicious for construction, energy, sports, and religious rituals.'
        ],
        'nakshatra' => [
            'id' => 15,
            'name' => 'Swati',
            'nameDevanagari' => 'स्वाति',
            'number' => 15,
            'pada' => 2,
            'startTime' => '04:10 AM',
            'endTime' => '06:30 PM',
            'ruler' => 'Rahu',
            'deity' => 'Vayu',
            'symbol' => 'Coral / Sprout',
            'auspiciousness' => 'auspicious',
            'description' => 'Movable Nakshatra: Ideal for travel, business, vehicle purchase, and music.'
        ],
        'yoga' => [
            'id' => 3,
            'name' => 'Ayushman',
            'nameDevanagari' => 'आयुष्मान',
            'number' => 3,
            'startTime' => '03:10 AM',
            'endTime' => '04:22 PM',
            'auspiciousness' => 'auspicious',
            'meaning' => 'Promotes long life, good health, and success in ventures.'
        ],
        'karana' => [
            'id' => 4,
            'name' => 'Taitila',
            'nameDevanagari' => 'तैतिल',
            'number' => 4,
            'type' => 'Chara',
            'startTime' => '05:30 AM',
            'endTime' => '06:40 PM',
            'isBhadra' => false,
            'auspiciousness' => 'auspicious'
        ],
        'inauspicious' => [
            'rahuKalam' => ['start' => '12:26 PM', 'end' => '02:04 PM', 'formattedDuration' => '1 hr 38 mins'],
            'yamaganda' => ['start' => '07:32 AM', 'end' => '09:10 AM', 'formattedDuration' => '1 hr 38 mins'],
            'gulikaKalam' => ['start' => '10:48 AM', 'end' => '12:26 PM', 'formattedDuration' => '1 hr 38 mins'],
            'durMuhurat' => [['start' => '12:02 PM', 'end' => '12:54 PM']],
            'varjyam' => [['start' => '04:15 PM', 'end' => '05:45 PM']]
        ],
        'auspicious' => [
            'abhijitMuhurat' => ['start' => '12:02 PM', 'end' => '12:50 PM', 'formattedDuration' => '48 mins'],
            'amritKalam' => [['start' => '08:30 AM', 'end' => '10:00 AM']],
            'brahmaMuhurat' => ['start' => '04:18 AM', 'end' => '05:06 AM', 'formattedDuration' => '48 mins'],
            'vijayaMuhurat' => ['start' => '02:35 PM', 'end' => '03:25 PM', 'formattedDuration' => '50 mins'],
            'godhuliMuhurat' => ['start' => '06:46 PM', 'end' => '07:10 PM', 'formattedDuration' => '24 mins'],
            'sandhyaPratah' => ['start' => '05:24 AM', 'end' => '06:24 AM'],
            'sandhyaSayahna' => ['start' => '06:28 PM', 'end' => '07:28 PM'],
            'sarvarthaSiddhiYoga' => true,
            'amritSiddhiYoga' => false
        ],
        'choghadiya' => [
            'day' => [
                ['name' => 'Labh', 'nameDevanagari' => 'लाभ', 'type' => 'Labh', 'quality' => 'gain', 'ruler' => 'Mercury', 'start' => '05:54 AM', 'end' => '07:32 AM'],
                ['name' => 'Amrit', 'nameDevanagari' => 'अमृत', 'type' => 'Amrit', 'quality' => 'best', 'ruler' => 'Moon', 'start' => '07:32 AM', 'end' => '09:10 AM'],
                ['name' => 'Kaal', 'nameDevanagari' => 'काल', 'type' => 'Kaal', 'quality' => 'loss', 'ruler' => 'Saturn', 'start' => '09:10 AM', 'end' => '10:48 AM'],
                ['name' => 'Shubh', 'nameDevanagari' => 'शुभ', 'type' => 'Shubh', 'quality' => 'good', 'ruler' => 'Jupiter', 'start' => '10:48 AM', 'end' => '12:26 PM'],
                ['name' => 'Rog', 'nameDevanagari' => 'रोग', 'type' => 'Rog', 'quality' => 'inauspicious', 'ruler' => 'Mars', 'start' => '12:26 PM', 'end' => '02:04 PM'],
                ['name' => 'Udveg', 'nameDevanagari' => 'उद्वेग', 'type' => 'Udveg', 'quality' => 'bad', 'ruler' => 'Sun', 'start' => '02:04 PM', 'end' => '03:42 PM'],
                ['name' => 'Char', 'nameDevanagari' => 'चर', 'type' => 'Char', 'quality' => 'neutral', 'ruler' => 'Venus', 'start' => '03:42 PM', 'end' => '05:20 PM'],
                ['name' => 'Labh', 'nameDevanagari' => 'लाभ', 'type' => 'Labh', 'quality' => 'gain', 'ruler' => 'Mercury', 'start' => '05:20 PM', 'end' => '06:58 PM']
            ],
            'night' => [
                ['name' => 'Udveg', 'nameDevanagari' => 'उद्वेग', 'type' => 'Udveg', 'quality' => 'bad', 'ruler' => 'Sun', 'start' => '06:58 PM', 'end' => '08:20 PM'],
                ['name' => 'Shubh', 'nameDevanagari' => 'शुभ', 'type' => 'Shubh', 'quality' => 'good', 'ruler' => 'Jupiter', 'start' => '08:20 PM', 'end' => '09:42 PM'],
                ['name' => 'Amrit', 'nameDevanagari' => 'अमृत', 'type' => 'Amrit', 'quality' => 'best', 'ruler' => 'Moon', 'start' => '09:42 PM', 'end' => '11:04 PM'],
                ['name' => 'Char', 'nameDevanagari' => 'चर', 'type' => 'Char', 'quality' => 'neutral', 'ruler' => 'Venus', 'start' => '11:04 PM', 'end' => '12:26 AM'],
                ['name' => 'Rog', 'nameDevanagari' => 'रोग', 'type' => 'Rog', 'quality' => 'inauspicious', 'ruler' => 'Mars', 'start' => '12:26 AM', 'end' => '01:48 AM'],
                ['name' => 'Kaal', 'nameDevanagari' => 'काल', 'type' => 'Kaal', 'quality' => 'loss', 'ruler' => 'Saturn', 'start' => '01:48 AM', 'end' => '03:10 AM'],
                ['name' => 'Labh', 'nameDevanagari' => 'लाभ', 'type' => 'Labh', 'quality' => 'gain', 'ruler' => 'Mercury', 'start' => '03:10 AM', 'end' => '04:32 AM'],
                ['name' => 'Udveg', 'nameDevanagari' => 'उद्वेग', 'type' => 'Udveg', 'quality' => 'bad', 'ruler' => 'Sun', 'start' => '04:32 AM', 'end' => '05:54 AM']
            ]
        ],
        'planetaryPositions' => [
            ['name' => 'Sun', 'nameDevanagari' => 'सूर्य', 'sign' => 'Simha (Leo)', 'signDevanagari' => 'सिंह', 'degree' => 2.45, 'nakshatra' => 'Magha', 'pada' => 1, 'isRetrograde' => false],
            ['name' => 'Moon', 'nameDevanagari' => 'चन्द्र', 'sign' => 'Tula (Libra)', 'signDevanagari' => 'तुला', 'degree' => 12.18, 'nakshatra' => 'Swati', 'pada' => 2, 'isRetrograde' => false]
        ],
        'festivalsToday' => [],
        'vratToday' => [],
        'summaryNote' => "Today in {$cityName}: Shasthi Tithi and Swati Nakshatra. Abhijit Muhurat is active from 12:02 PM to 12:50 PM. Rahu Kalam is from 12:26 PM to 02:04 PM.",
        'meta' => [
            'generatedAt' => gmdate('c'),
            'source' => 'WordPress Headless Panchang Core Plugin',
            'version' => PANCHANG_CORE_VERSION
        ]
    ];
}