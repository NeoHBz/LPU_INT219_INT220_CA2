<?php
$router = new Router();

// Simple root route
$router->get('/', function() {
    require_once __DIR__ . '/status.php';
});

// Handle any other route through the automatic modular routing
$router->dispatch();