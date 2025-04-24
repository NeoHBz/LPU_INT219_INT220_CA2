<?php

namespace App\Controllers;

use App\Models\User;
use App\Utils\Response;
use App\Auth\JWT;

class UserController {
    private $userModel;
    
    public function __construct() {
        $this->userModel = new User();
    }
    
    private function validateAndSanitizeInput($data) {
        $sanitized = [];
        
        if (isset($data['username'])) {
            $sanitized['username'] = htmlspecialchars($data['username'], ENT_QUOTES, 'UTF-8');
        }
        
        if (isset($data['email'])) {
            $sanitized['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        }

        if (isset($data['first_name'])) {
            $sanitized['first_name'] = htmlspecialchars($data['first_name'], ENT_QUOTES, 'UTF-8');
        }
        
        if (isset($data['last_name'])) {
            $sanitized['last_name'] = htmlspecialchars($data['last_name'], ENT_QUOTES, 'UTF-8');
        }
        
        return array_merge($data, $sanitized);
    }
    public function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['email']) || empty($data['password'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Email and password are required'
            ], 400);
        }

        $data = $this->validateAndSanitizeInput($data);
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid email format'
            ], 400);
        }

        $user = $this->userModel->findByEmail($data['email']);
        
        if (!$user) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
        
        if (!password_verify($data['password'], $user['password'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
        
        unset($user['password']);
        
        $token = JWT::encode([
            'id' => $user['id'],
            'email' => $user['email']
        ]);
        
        return Response::json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }
    
    public function register() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['username']) || empty($data['email']) || empty($data['password']) || empty($data['first_name']) || empty($data['last_name'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Missing required fields'
            ], 400);
        }
        
        $existingUser = $this->userModel->findByEmail($data['email']);
        if ($existingUser) {
            return Response::json([
                'status' => 'error',
                'message' => 'Email already in use'
            ], 409);
        }
        
        $data = $this->validateAndSanitizeInput($data);
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid email format'
            ], 400);
        }
        $userId = $this->userModel->create($data);
        
        if (!$userId) {
            return Response::json([
                'status' => 'error',
                'message' => 'Failed to create user'
            ], 500);
        }
        
        $user = $this->userModel->findById($userId);
        
        $token = JWT::encode([
            'id' => $userId,
            'email' => $data['email']
        ]);
        
        return Response::json([
            'status' => 'success',
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ]);
    }
    
    public function me(): array {
        $userId = $_REQUEST['user']['id'] ?? null;
        
        if (!$userId) {
            return Response::json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        $user = $this->userModel->findById($userId);
        
        if (!$user) {
            return Response::json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        unset($user['password']);
        
        return Response::json([
            'status' => 'success',
            'data' => $user
        ]);
    }
    
}