<?php

namespace App\Auth;

class JWT {
    public static function encode($payload) {
        // Add expiration time to payload
        $payload['exp'] = time() + 3600; // 1 hour expiration
        
        // Simple encoding for college project
        return base64_encode(json_encode($payload));
    }
    
    public static function decode($token) {
        // Simple decoding for college project
        $payload = json_decode(base64_decode($token), true);
        
        // Basic expiration check
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new \Exception('Token expired');
        }
        
        return $payload;
    }
}