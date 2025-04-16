<?php

use App\Controllers\TrainerController;

$router->get('/trainers', function() {
    $controller = new TrainerController();
    $controller->index();
});

$router->get('/trainers/:id', function($id) {
    $controller = new TrainerController();
    $controller->findById($id);
});
