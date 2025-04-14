<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\UserController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);

// Auth routes (now using UserController)
$router->post('/login', [UserController::class, 'login']);
$router->post('/register', [UserController::class, 'register']);

// User routes with auth
$router->get('/user', [UserController::class, 'show'])->middleware('auth');
$router->put('/user', [UserController::class, 'update'])->middleware('auth');

return $router;