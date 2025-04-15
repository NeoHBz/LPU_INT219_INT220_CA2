<?php

/**
 * Simple autoloader, autoload classes from the App namespace
 */
spl_autoload_register(function ($class) {
    // Convert namespace to file path
    $class = str_replace('App\\', '', $class);
    $class = str_replace('\\', '/', $class);
    
    // List of common directories to check
    $directories = [
        __DIR__ . '/',
        __DIR__ . '/controllers/',
        __DIR__ . '/models/',
        __DIR__ . '/middleware/',
        __DIR__ . '/auth/',
        __DIR__ . '/config/',
        __DIR__ . '/database/',
        __DIR__ . '/routes/'
    ];
    
    // Check each directory for the file
    foreach ($directories as $directory) {
        $file = $directory . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});