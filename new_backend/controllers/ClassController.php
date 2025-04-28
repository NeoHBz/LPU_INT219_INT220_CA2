<?php
namespace App\Controllers;
use App\Models\ClassModel;
use App\Utils\Response;

class ClassController {
    private $classModel;
    
    public function __construct() {
        $this->classModel = new ClassModel();
    }
    
    public function index() {
        $filters = $this->getFiltersFromRequest();
        $classes = $this->classModel->getAll($filters);
        
        return Response::json([
            'status' => 'success',
            'data' => $classes
        ]);
    }
    
    public function show($id) {
        $class = $this->classModel->getById($id);
        
        if (!$class) {
            return Response::json([
                'status' => 'error',
                'message' => 'Class not found'
            ], 404);
        }
        
        return Response::json([
            'status' => 'success',
            'data' => $class
        ]);
    }
    
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return Response::json([
                'status' => 'error',
                'message' => 'Method not allowed'
            ], 405);
        }

        $requestBody = file_get_contents('php://input');
        $data = json_decode($requestBody, true);

        $requiredFields = ['class_name', 'class_type_id', 'trainer_id', 'max_capacity', 'description', 'schedule'];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return Response::json([
                    'status' => 'error',
                    'message' => "Field '$field' is required"
                ], 400);
            }
        }

        // Validate schedule format
        if (!is_array($data['schedule'])) {
            return Response::json([
                'status' => 'error',
                'message' => "Schedule must be an array"
            ], 400);
        }

        foreach ($data['schedule'] as $schedule) {
            if (!isset($schedule['day_of_week']) || !isset($schedule['start_time']) || !isset($schedule['end_time'])) {
                return Response::json([
                    'status' => 'error',
                    'message' => "Each schedule item must contain day_of_week, start_time, and end_time"
                ], 400);
            }
        }

        $classId = $this->classModel->create($data);
        
        if (!$classId) {
            return Response::json([
                'status' => 'error',
                'message' => 'Failed to create class'
            ], 500);
        }

        $class = $this->classModel->getById($classId);
        
        return Response::json([
            'status' => 'success',
            'message' => 'Class created successfully',
            'data' => $class
        ], 201);
    }
    
    private function getFiltersFromRequest() {
        $filters = [];
        
        if (isset($_GET['type'])) {
            $filters['type'] = $_GET['type'];
        }
        
        if (isset($_GET['trainer_id'])) {
            $filters['trainer_id'] = $_GET['trainer_id'];
        }
        
        return $filters;
    }
}