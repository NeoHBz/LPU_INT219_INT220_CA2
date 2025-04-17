<?php

namespace App\Controllers;

class HomeController {
    public function status(): array {
        return [
            'status' => 'success',
            'message' => 'Server is running',
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

}