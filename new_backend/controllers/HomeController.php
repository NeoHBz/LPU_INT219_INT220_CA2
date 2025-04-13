<?php

namespace App\Controllers;

class HomeController {
    public function index() {
        return [
            'status' => 'success',
            'message' => 'Fitness API is running'
        ];
    }
}