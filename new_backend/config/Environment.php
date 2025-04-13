<?php

namespace App\Config;

class Environment {
    public static function load($path) {
        // Default values
        $_ENV['DB_HOST'] = 'localhost';
        $_ENV['DB_PORT'] = '3306';
        $_ENV['DB_DATABASE'] = 'fitness';
        $_ENV['DB_USERNAME'] = 'root';
        $_ENV['DB_PASSWORD'] = 'passwd0x00';
        $_ENV['JWT_SECRET'] = 'default_secure_jwt_secret_key';
        $_ENV['JWT_EXPIRATION'] = '3600';
        $_ENV['APP_ENV'] = 'development';
        $_ENV['APP_DEBUG'] = 'true';
        
        // Copy to $_SERVER as well
        foreach ($_ENV as $key => $value) {
            $_SERVER[$key] = $value;
            putenv("$key=$value");
        }
        
        // Try to load from file if exists
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) {
                    continue;
                }
                
                list($name, $value) = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);
                
                if (strpos($value, '"') === 0 && strrpos($value, '"') === strlen($value) - 1) {
                    $value = substr($value, 1, -1);
                } elseif (strpos($value, "'") === 0 && strrpos($value, "'") === strlen($value) - 1) {
                    $value = substr($value, 1, -1);
                }
                
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
                putenv("$name=$value");
            }
        }
    }
}