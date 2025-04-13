<?php
/**
 * Request Utility
 * Handles processing of HTTP requests
 */
class RequestUtil {
    /**
     * Get and parse JSON data from request body
     * 
     * @return array Parsed JSON data
     * @throws Exception If JSON is invalid
     */
    public static function getJsonData() {
        $rawData = file_get_contents('php://input');
        $data = json_decode($rawData, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON data');
        }
        
        return $data;
    }
    
    /**
     * Get all request parameters (combines GET, POST, and JSON data)
     * 
     * @return array Combined request parameters
     */
    public static function getAllParams() {
        $params = $_REQUEST;
        
        // Try to add JSON data if present
        try {
            $jsonData = self::getJsonData();
            if (is_array($jsonData)) {
                $params = array_merge($params, $jsonData);
            }
        } catch (Exception $e) {
            // JSON data not present or invalid, continue with existing params
        }
        
        return $params;
    }
    
    /**
     * Check if the current request is a specific HTTP method
     * 
     * @param string $method The HTTP method to check for
     * @return bool True if the request matches the method
     */
    public static function isMethod($method) {
        return $_SERVER['REQUEST_METHOD'] === strtoupper($method);
    }
}