<?php

namespace App\Auth;

class JWT {
    public static function encode($payload) {
        $payload['exp'] = time() + $_ENV['JWT_EXPIRATION'] ?? 3600;
        
        return base64_encode(json_encode($payload));
    }
    
    public static function decode($token) {
        if (strpos($token, 'Bearer ') === 0) {
            $token = substr($token, 7);
        }
        $payload = json_decode(base64_decode($token), true);
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new \Exception('Token expired');
        }
        
        return $payload;
    }
}