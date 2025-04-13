<?php

namespace App\Controllers;

use App\Models\User;
use App\Auth\JWT;

class UserController {
    private $userModel;
    
    public function __construct() {
        $this->userModel = new User();
    }
    
    public function register() {
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            header('HTTP/1.1 400 Bad Request');
            return [
                'status' => 'error',
                'message' => 'Missing required fields'
            ];
        }
        
        // Check if email already exists
        $existingUser = $this->userModel->findByEmail($data['email']);
        if ($existingUser) {
            header('HTTP/1.1 409 Conflict');
            return [
                'status' => 'error',
                'message' => 'Email already in use'
            ];
        }
        
        // Create user
        $userId = $this->userModel->create($data);
        
        if (!$userId) {
            header('HTTP/1.1 500 Internal Server Error');
            return [
                'status' => 'error',
                'message' => 'Failed to create user'
            ];
        }
        
        // Get the created user without password
        $user = $this->userModel->findById($userId);
        
        // Generate JWT token
        $token = JWT::encode([
            'user_id' => $userId,
            'email' => $data['email']
        ]);
        
        return [
            'status' => 'success',
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ];
    }
    
    public function login() {
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (empty($data['email']) || empty($data['password'])) {
            header('HTTP/1.1 400 Bad Request');
            return [
                'status' => 'error',
                'message' => 'Email and password are required'
            ];
        }
        
        // Find user by email
        $user = $this->userModel->findByEmail($data['email']);
        
        if (!$user) {
            header('HTTP/1.1 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => 'Invalid credentials'
            ];
        }
        
        // Verify password
        if (!password_verify($data['password'], $user['password'])) {
            header('HTTP/1.1 401 Unauthorized');
            return [
                'status' => 'error',
                'message' => 'Invalid credentials'
            ];
        }
        
        // Remove password from user data
        unset($user['password']);
        
        // Generate JWT token
        $token = JWT::encode([
            'user_id' => $user['id'],
            'email' => $user['email']
        ]);
        
        // Save token in session as fallback (optional)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['token'] = $token;
        
        return [
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ];
    }
    
    public function profile() {
        $userId = $_REQUEST['user']['user_id'];
        
        $user = $this->userModel->findById($userId);
        
        if (!$user) {
            header('HTTP/1.1 404 Not Found');
            return [
                'status' => 'error',
                'message' => 'User not found'
            ];
        }
        
        return [
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ];
    }
    
    public function update() {
        $userId = $_REQUEST['user']['user_id'];
        
        // Get PUT data
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data)) {
            header('HTTP/1.1 400 Bad Request');
            return [
                'status' => 'error',
                'message' => 'No data provided for update'
            ];
        }
        
        // Update user
        $success = $this->userModel->update($userId, $data);
        
        if (!$success) {
            header('HTTP/1.1 500 Internal Server Error');
            return [
                'status' => 'error',
                'message' => 'Failed to update user'
            ];
        }
        
        // Get updated user data
        $user = $this->userModel->findById($userId);
        
        return [
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => [
                'user' => $user
            ]
        ];
    }
}