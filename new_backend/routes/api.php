<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\UserController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);
$router->get('/plans', [HomeController::class, 'plans']);

// User routes
$router->post('/user/login', [UserController::class, 'login']);
$router->post('/user/register', [UserController::class, 'register']);
$router->get('/user/me', [UserController::class, 'me'])->middleware('auth');

return $router;