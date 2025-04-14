<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\UserController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);

// User routes
$router->post('/user/login', [UserController::class, 'login']);
$router->post('/user/register', [UserController::class, 'register']);

return $router;