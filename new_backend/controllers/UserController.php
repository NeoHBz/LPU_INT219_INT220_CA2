<?php

namespace App\Controllers;

use App\Models\User;
use App\Utils\Response;
use App\Auth\JWT;

class UserController {
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
        
        $user = User::find($decoded->id);
        
        if (!$user) {
            return Response::json(['error' => 'User not found'], 404);
        }
        
        // Don't return password
        unset($user->password);
        
        return Response::json($user);
    }
    
    public function update() {
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;
        
        if (!$token) {
            return Response::json(['error' => 'Unauthorized'], 401);
        }
        
        $decoded = JWT::decode($token);
        
        if (!$decoded) {
            return Response::json(['error' => 'Invalid token'], 401);
        }
        
        $user = User::find($decoded->id);
        
        if (!$user) {
            return Response::json(['error' => 'User not found'], 404);
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Update only allowed fields
        $allowedFields = ['name', 'email'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $user->$field = $data[$field];
            }
        }
        
        // Handle password update separately
        if (isset($data['password']) && !empty($data['password'])) {
            $user->password = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        
        $user->save();
        
        // Don't return password
        unset($user->password);
        
        return Response::json($user);
    }
}