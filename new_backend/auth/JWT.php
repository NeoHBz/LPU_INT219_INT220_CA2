<?php

namespace App\Auth;

class JWT {
    public static function encode($payload) {
        $payload['exp'] = time() + 3600; // 1 hour expiration
        
        return base64_encode(json_encode($payload));
    }
    
    public static function decode($token) {
        $payload = json_decode(base64_decode($token), true);
        
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new \Exception('Token expired');
        }
        
        return $payload;
    }
}