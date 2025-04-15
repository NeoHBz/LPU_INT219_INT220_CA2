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
        
        // Transform data to match the API documentation format
        $transformedPlans = array_map(function($plan) {
            return [
                'planId' => $plan['id'],
                'planName' => $plan['plan_name'],
                'price' => (float) $plan['price'],
                'duration' => $plan['duration'],
                'membershipType' => $plan['membership_type'],
                'createdAt' => $plan['created_at'],
                'updatedAt' => $plan['updated_at']
            ];
        }, $plans);
        
        return Response::json([
            'success' => true,
            'data' => $transformedPlans
        ]);
    }
    
    public function getById($id) {
        $plan = $this->planModel->findById($id);
        
        if (!$plan) {
            return Response::json([
                'success' => false,
                'message' => 'Plan not found'
            ], 404);
        }
        
        // Transform to match API format
        $transformedPlan = [
            'planId' => $plan['id'],
            'planName' => $plan['plan_name'],
            'price' => (float) $plan['price'],
            'duration' => $plan['duration'],
            'membershipType' => $plan['membership_type'],
            'createdAt' => $plan['created_at'],
            'updatedAt' => $plan['updated_at']
        ];
        
        return Response::json([
            'success' => true,
            'data' => $transformedPlan
        ]);
    }
}