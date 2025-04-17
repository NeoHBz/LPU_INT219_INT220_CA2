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
        // Validate and sanitize input data
        $data['username'] = filter_var($data['username'], FILTER_SANITIZE_STRING);
        $data['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['first_name'] = filter_var($data['first_name'], FILTER_SANITIZE_STRING);
        $data['last_name'] = filter_var($data['last_name'], FILTER_SANITIZE_STRING);
        
        return $data;
    }

    public function login() {
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['email']) || empty($data['password'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Email and password are required'
            ], 400);
        }

        // Sanitize input data
        $data = $this->validateAndSanitizeInput($data);
        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid email format'
            ], 400);
        }

        // Find user by email
        $user = $this->userModel->findByEmail($data['email']);
        
        if (!$user) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
        
        // Verify password
        if (!password_verify($data['password'], $user['password'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }
        
        // Remove password from user data
        unset($user['password']);
        
        // Generate JWT token
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
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['username']) || empty($data['email']) || empty($data['password']) || empty($data['first_name']) || empty($data['last_name'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Missing required fields'
            ], 400);
        }
        
        // Check if email already exists
        $existingUser = $this->userModel->findByEmail($data['email']);
        if ($existingUser) {
            return Response::json([
                'status' => 'error',
                'message' => 'Email already in use'
            ], 409);
        }
        
        // Sanitize input data
        $data = $this->validateAndSanitizeInput($data);
        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid email format'
            ], 400);
        }
        // Create user
        $userId = $this->userModel->create($data);
        
        if (!$userId) {
            return Response::json([
                'status' => 'error',
                'message' => 'Failed to create user'
            ], 500);
        }
        
        // Get the created user without password
        $user = $this->userModel->findById($userId);
        
        // Generate JWT token
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
        // Get user ID from request
        $userId = $_REQUEST['user']['id'] ?? null;
        
        if (!$userId) {
            return Response::json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        // Find user by ID
        $user = $this->userModel->findById($userId);
        
        if (!$user) {
            return Response::json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }
        
        // Remove password from user data
        unset($user['password']);
        
        return Response::json([
            'status' => 'success',
            'data' => $user
        ]);
    }
    
}