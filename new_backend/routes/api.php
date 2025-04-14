<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\AuthController;
use App\Controllers\UserController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);

// Auth routes
$router->post('/login', [AuthController::class, 'login']);
$router->post('/register', [AuthController::class, 'register']);

// User routes with auth
$router->get('/user', [UserController::class, 'show'])->middleware('auth');
$router->put('/user', [UserController::class, 'update'])->middleware('auth');

return $router;