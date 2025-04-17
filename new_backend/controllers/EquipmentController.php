<?php

namespace App\Controllers;

use App\Models\Equipment;
use App\Utils\Response;

class EquipmentController {
    private $equipmentModel;

    public function __construct() {
        $this->equipmentModel = new Equipment();
    }

    public function index() {
        $equipment = $this->equipmentModel->getAll();
        return Response::json([
            'status' => 'success',
            'data' => $equipment
        ]);
    }

    public function show($id) {
        $equipment = $this->equipmentModel->findById($id);
        if (!$equipment) {
            return Response::json([
                'status' => 'error',
                'message' => 'Equipment not found'
            ], 404);
        }
        return Response::json([
            'status' => 'success',
            'data' => $equipment
        ]);
    }
}