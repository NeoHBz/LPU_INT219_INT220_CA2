<?php

// Enable error reporting during development
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for API responses
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Include the autoloader
require_once __DIR__ . '/autoload.php';

// Start session
session_start();

// Load environment variables
\App\Config\Environment::load(__DIR__ . '/.env');

// Include routes
$router = require_once __DIR__ . '/routes/api.php';

// Process the request
$router->resolve();