<?php

use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Routing\Router;

$router = new Router();

// User routes
$router->post('/user/register', [new UserController(), 'register']);
$router->post('/user/login', [new UserController(), 'login']);
$router->get('/user/profile', [new UserController(), 'profile'])->middleware('Auth');
$router->put('/user/update', [new UserController(), 'update'])->middleware('Auth');

// Home route for server status check
$router->get('/status', [new HomeController(), 'index']);

return $router;