<?php

namespace App\Middleware;

use App\Auth\JWT;

class Auth {
    public function handle() {
        $headers = getallheaders();
        $token = null;
        
        // Check header for token
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            if (strpos($authHeader, 'Bearer ') === 0) {
                $token = substr($authHeader, 7);
            }
        }
        
        // Quick check if token exists
        if (!$token) {
            header('HTTP/1.0 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => 'Authentication required'
            ];
        }
        
        try {
            $payload = JWT::decode($token);
            
            // Add user info to request for controllers to use
            $_REQUEST['user'] = $payload;
            
            return null; // Proceed to controller
        } catch (\Exception $e) {
            header('HTTP/1.0 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => 'Invalid token'
            ];
        }
    }
}