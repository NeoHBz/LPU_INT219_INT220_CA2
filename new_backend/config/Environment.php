<?php

namespace App\Config;

class Environment {
    public static function load($path) {
        // Set defaults directly
        $_ENV['DB_HOST'] = 'localhost';
        $_ENV['DB_PORT'] = '3306';
        $_ENV['DB_DATABASE'] = 'fitness';
        $_ENV['DB_USERNAME'] = 'root';
        $_ENV['DB_PASSWORD'] = 'passwd0x00';
        
        // Try to load from file if exists
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) {
                    continue;
                }
                
                $parts = explode('=', $line, 2);
                if (count($parts) == 2) {
                    $name = trim($parts[0]);
                    $value = trim($parts[1]);
                    $_ENV[$name] = $value;
                }
            }
        }
        
        // Copy to $_SERVER for compatibility
        foreach ($_ENV as $key => $value) {
            $_SERVER[$key] = $value;
        }
    }
}