<?php

namespace App\Controllers;

use App\Models\Plan;
use App\Utils\Response;

class PlanController {
    private $planModel;
    
    public function __construct() {
        $this->planModel = new Plan();
    }
    
    public function getAll() {
        $plans = $this->planModel->findAll();
        
        foreach ($plans as &$plan) {
            if (isset($plan['features'])) {
                $plan['features'] = json_decode($plan['features'], true);
            }
            
            if (isset($plan['price'])) {
                $plan['price'] = (float) $plan['price'];
            }
        }
        
        return Response::json([
            'status' => 'success',
            'data' => $plans
        ]);
    }
    
    public function getById($id) {
        $plan = $this->planModel->findById($id);
        
        if (!$plan) {
            return Response::json([
                'status' => 'error',
                'message' => 'Plan not found'
            ], 404);
        }
        
        if (isset($plan['features'])) {
            $plan['features'] = json_decode($plan['features'], true);
        }
        
        if (isset($plan['price'])) {
            $plan['price'] = (float) $plan['price'];
        }
        
        return Response::json([
            'status' => 'success',
            'data' => $plan
        ]);
    }
}