<?php
/**
 * Response Utility
 * Handles API response formatting and sending
 */
class ResponseUtil {
    /**
     * Send a success response
     * 
     * @param array $data The data to send in the response
     * @param int $statusCode HTTP status code
     */
    public static function sendSuccess($data, $statusCode = 200) {
        self::sendResponse($data, $statusCode);
    }
    
    /**
     * Send an error response
     * 
     * @param string $message Error message
     * @param int $statusCode HTTP status code
     */
    public static function sendError($message, $statusCode = 400) {
        self::sendResponse(['error' => $message], $statusCode);
    }
    
    /**
     * Send a 404 Not Found response
     * 
     * @param string $message Error message
     */
    public static function sendNotFound($message = 'Not found') {
        self::sendError($message, 404);
    }
    
    /**
     * Send a 405 Method Not Allowed response
     * 
     * @param array $allowedMethods Array of allowed HTTP methods
     */
    public static function sendMethodNotAllowed($allowedMethods = []) {
        http_response_code(405);
        if (!empty($allowedMethods)) {
            header('Allow: ' . implode(', ', $allowedMethods));
        }
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }
    
    /**
     * Send a JSON response with appropriate headers
     * 
     * @param array $data The data to send
     * @param int $statusCode HTTP status code
     */
    private static function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}