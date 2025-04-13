<?php

namespace App\Auth;

class JWT {
    public static function encode($payload) {
        // Add expiration time to payload
        $expiration = $_ENV['JWT_EXPIRATION'] ?? 3600;
        $payload['exp'] = time() + $expiration;
        
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ];
        
        $headerEncoded = self::base64UrlEncode(json_encode($header));
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));
        
        // Use hardcoded secret if not in environment
        $secret = $_ENV['JWT_SECRET'] ?? 'default_secure_jwt_secret_key';
        
        $signature = hash_hmac('sha256', "$headerEncoded.$payloadEncoded", $secret, true);
        $signatureEncoded = self::base64UrlEncode($signature);
        
        return "$headerEncoded.$payloadEncoded.$signatureEncoded";
    }
    
    public static function decode($token) {
        list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $token);
        
        // Use hardcoded secret if not in environment
        $secret = $_ENV['JWT_SECRET'] ?? 'default_secure_jwt_secret_key';
        
        // Verify signature
        $signature = self::base64UrlDecode($signatureEncoded);
        $expectedSignature = hash_hmac('sha256', "$headerEncoded.$payloadEncoded", $secret, true);
        
        if (!hash_equals($signature, $expectedSignature)) {
            throw new \Exception('Invalid token');
        }
        
        $payload = json_decode(self::base64UrlDecode($payloadEncoded), true);
        
        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new \Exception('Token expired');
        }
        
        return $payload;
    }
    
    private static function base64UrlEncode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    private static function base64UrlDecode($data) {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}