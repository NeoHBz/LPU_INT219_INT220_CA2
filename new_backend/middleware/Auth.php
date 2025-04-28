<?php

namespace App\Middleware;
use App\Models\User;
use App\Auth\JWT;

class Auth {
    public function handle() {
         $headers = getallheaders();
        $authHeader = null;

        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        }

        $token = null;
        if ($authHeader && strpos($authHeader, 'Bearer ') === 0) {
            $token = substr($authHeader, 7);
        }

        if (!$token) {
            header('HTTP/1.0 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => 'Authentication required'
            ];
        }
        
        try {
            $payload = JWT::decode($token);
            if (isset($payload['id'])) {
                $userModel = new User();
                $user = $userModel->findById($payload['id']);
                
                if (!$user) {
                    throw new \Exception('User not found');
                }
                
                unset($user->password);
                
                $_REQUEST['user'] = $payload;
                $_REQUEST['user_details'] = $user;
            } else {
                throw new \Exception('Something went wrong with the token');
            }
            
            return null;
        } catch (\Exception $e) {
            header('HTTP/1.0 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}