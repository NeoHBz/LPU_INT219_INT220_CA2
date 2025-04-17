<?php

namespace App\Controllers;

use App\Models\Attendance;
use App\Utils\Response;

class AttendanceController {
    private $attendanceModel;

    public function __construct() {
        $this->attendanceModel = new Attendance();
    }

    public function getByDate($date) {
        // Expecting $date in format YYYYMMDD
        $parsedDate = date('Y-m-d', strtotime($date));
        error_log("Parsed date: $parsedDate");
        $records = $this->attendanceModel->getByDate($parsedDate);
        return Response::json([
            'status' => 'success',
            'data' => $records
        ]);
    }

    public function create() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (empty($data['member_id']) || empty($data['check_in'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'member_id and check_in are required'
            ], 400);
        }
        
        // Parse and validate date format for check_in
        if (!strtotime($data['check_in'])) {
            return Response::json([
                'status' => 'error',
                'message' => 'Invalid check_in date format'
            ], 400);
        }
        $data['check_in'] = date('Y-m-d H:i:s', strtotime($data['check_in']));
        
        // Parse and validate date format for check_out if provided
        if (!empty($data['check_out'])) {
            if (!strtotime($data['check_out'])) {
                return Response::json([
                    'status' => 'error',
                    'message' => 'Invalid check_out date format'
                ], 400);
            }
            $data['check_out'] = date('Y-m-d H:i:s', strtotime($data['check_out']));
        }
        
        $attendanceId = $this->attendanceModel->create($data);
        return Response::json([
            'status' => 'success',
            'attendance_id' => $attendanceId
        ], 201);
    }
}