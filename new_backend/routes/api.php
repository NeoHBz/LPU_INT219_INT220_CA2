<?php

use App\Routes\Router;
use App\Controllers\HomeController;
use App\Controllers\UserController;
use App\Controllers\MemberController;
use App\Controllers\PlanController;
use App\Controllers\TrainerController;
use App\Controllers\ClassController;
use App\Controllers\AttendanceController;
use App\Controllers\EquipmentController;

$router = new Router();

// Public routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/status', [HomeController::class, 'status']);

// User routes
$router->get('/user/me', [UserController::class, 'me'])->middleware('auth');

$router->post('/user/login', [UserController::class, 'login']);
$router->post('/user/register', [UserController::class, 'register']);

// Membership Routes
$router->get('/members', [MemberController::class, 'listAll']);
$router->post('/members', [MemberController::class, 'create']);

// Plans Route
$router->get('/plans', [PlanController::class, 'getAll']);

// Trainer Routes
$router->get('/trainers', [TrainerController::class, 'index']);
$router->get('/trainers/{id}', [TrainerController::class, 'findById']);

// Class Routes
$router->get('/classes', [ClassController::class, 'index']);
$router->get('/classes/{id}', [ClassController::class, 'show']);
$router->post('/classes', [ClassController::class, 'create']);

// Attendance Routes
$router->get('/attendance/{date}', [AttendanceController::class, 'getByDate']);
$router->post('/attendance', [AttendanceController::class, 'create']);

// Equipment Routes
$router->get('/equipment', [EquipmentController::class, 'index']);
$router->get('/equipment/{id}', [EquipmentController::class, 'show']);

return $router;