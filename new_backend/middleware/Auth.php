<?php

namespace App\Middleware;
use App\Models\User;
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
            // Get complete user details from database using the user ID in payload
            if (isset($payload['id'])) {
                $userModel = new User();
                $user = $userModel->findById($payload['id']);
                
                if (!$user) {
                    throw new \Exception('User not found');
                }
                
                // Remove sensitive data before attaching to request
                unset($user->password);
                
                // Attach both the JWT payload and full user details
                $_REQUEST['user'] = $payload;
                $_REQUEST['user_details'] = $user;
            } else {
                throw new \Exception('Something went wrong with the token');
            }
            
            return null; // Proceed to controller
        } catch (\Exception $e) {
            header('HTTP/1.0 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}