<?php
require_once __DIR__ . '/../controllers/UserController.php';

// Initialize controller
$userController = new UserController();

// Route handling
$route = $_GET['route'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

// Map routes to controller methods
switch ($route) {
    case 'register':
        if ($method === 'POST') {
            $userController->register();
        } else {
            ResponseUtil::sendMethodNotAllowed(allowedMethods: ['POST']);
        }
        break;
    // Add more routes as needed
    default:
        ResponseUtil::sendNotFound('Route not found');
}