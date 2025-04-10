<?php
$router = new Router();

// Dynamically map GET requests to {url}.php
$router->get('/{url}', function($url) {
    $filePath = __DIR__ . "/{$url}.php";

    if (file_exists($filePath)) {
        require_once $filePath;
    } else {
        http_response_code(404);
        echo "404 Not Found";
    }
});

// Dynamically map POST requests to {url}.php
$router->post('/{url}', function($url) {
    $filePath = __DIR__ . "/{$url}.php";

    if (file_exists($filePath)) {
        require_once $filePath;
    } else {
        http_response_code(404);
        echo "404 Not Found";
    }
});

$router->dispatch();