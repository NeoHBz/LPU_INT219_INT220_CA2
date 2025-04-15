<?php

namespace App\Utils;

class Response {
    /**
     * Return a JSON response
     * 
     * @param mixed $data The data to encode as JSON
     * @param int $statusCode HTTP status code
     * @return array Response array with headers set
     */
    public static function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        
        // For simplicity, we're returning the data rather than echoing it
        // The router will handle the actual output
        return $data;
    }
}