<?php

namespace App\Controllers;

class HomeController {
    public function index() {
        return [
            'status' => 'success',
            'message' => 'Fitness API is running'
        ];
    }
    
    public function status() {
        return [
            'status' => 'success',
            'message' => 'Server is running',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }
}