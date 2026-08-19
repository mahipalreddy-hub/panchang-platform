<?php
if (!defined('ABSPATH')) exit;

/**
 * Helper: Format REST Response Envelope
 */
function panchang_api_success($data, $meta = []) {
    return new WP_REST_Response([
        'success' => true,
        'data' => $data,
        'meta' => array_merge([
            'timestamp' => gmdate('c'),
            'serverTime' => current_time('mysql'),
            'version' => PANCHANG_CORE_VERSION
        ], $meta)
    ], 200);
}

function panchang_api_error($message, $code = 'invalid_request', $status = 400) {
    return new WP_REST_Response([
        'success' => false,
        'error' => [
            'code' => $code,
            'message' => $message
        ]
    ], $status);
}

/**
 * Helper: Validate Date String Format (YYYY-MM-DD)
 */
function panchang_validate_date($date, $format = 'Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}