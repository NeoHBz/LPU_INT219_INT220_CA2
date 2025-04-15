<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Controllers\MembershipsController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);
$router->get('/plans', [HomeController::class, 'plans']);

// User routes
$router->get('/user/me', [UserController::class, 'me'])->middleware('auth');

$router->post('/user/login', [UserController::class, 'login']);
$router->post('/user/register', [UserController::class, 'register']);

// Memberships Routes
$router->get('/members', [MembershipsController::class, 'listAll']);

return $router;