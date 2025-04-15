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
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
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
    
    public function show() {
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
        
        if (!$token) {
            return Response::json(['error' => 'Unauthorized'], 401);
        }
        
        $decoded = JWT::decode($token);
        
        if (!$decoded) {
            return Response::json(['error' => 'Invalid token'], 401);
        }
        
        $user = $this->userModel->findById($decoded->id);
        
        if (!$user) {
            return Response::json(['error' => 'User not found'], 404);
        }
        
        // Don't return password
        unset($user['password']);
        
        return Response::json($user);
    }
    
}