<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN, Origin, Accept, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, DNT, Referer, User-Agent');
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     header('Content-Length: 0');
//     header('Content-Type: text/plain');
//     exit(0);
// }
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit(0);
}
header('Content-Type: application/json');

require_once __DIR__ . '/autoload.php';

session_start();

\App\Config\Environment::load(__DIR__ . '/.env');

// Include routes
$router = require_once __DIR__ . '/routes/api.php';

// Process the request
$router->resolve();