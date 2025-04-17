<?php

namespace App\Controllers;

use App\Models\Trainer;
use App\Utils\Response;

class TrainerController {
    private $trainerModel;
    
    public function __construct() {
        $this->trainerModel = new Trainer();
    }
    
    public function index() {
        $trainers = $this->trainerModel->findAll();
        
        return Response::json([
            'status' => 'success',
            'data' => $trainers
        ]);
    }
    
    public function findById($id) {
        $trainer = $this->trainerModel->findById($id);
        
        if (!$trainer) {
            return Response::json([
                'status' => 'error',
                'message' => 'Trainer not found'
            ], 404);
        }
        
        return Response::json([
            'status' => 'success',
            'data' => $trainer
        ]);
    }
}
