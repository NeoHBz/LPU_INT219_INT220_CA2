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
        $attendanceId = $this->attendanceModel->create($data);
        return Response::json([
            'status' => 'success',
            'attendance_id' => $attendanceId
        ], 201);
    }
}