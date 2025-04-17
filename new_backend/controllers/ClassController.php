<?php
namespace App\Controllers;
use App\Models\ClassModel;
use App\Utils\Response;

class ClassController {
    private $classModel;
    
    public function __construct() {
        $this->classModel = new ClassModel();
    }
    
    // GET /classes
    public function index() {
        $filters = $this->getFiltersFromRequest();
        $classes = $this->classModel->getAll($filters);
        
        return Response::json([
            'status' => 'success',
            'data' => $classes
        ]);
    }
    
    // GET /classes/{id}
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
    
    // Extract filters from request
    private function getFiltersFromRequest() {
        $filters = [];
        
        if (isset($_GET['type'])) {
            $filters['type'] = $_GET['type'];
        }
        
        if (isset($_GET['instructor_id'])) {
            $filters['instructor_id'] = $_GET['instructor_id'];
        }
        
        return $filters;
    }
}