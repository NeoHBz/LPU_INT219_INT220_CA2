<?php

namespace App\Models;

use App\Database\Database;

class Attendance {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getByDate($date) {
        $sql = "SELECT * FROM attendance WHERE DATE(check_in) = ? ORDER BY check_in ASC";
        $stmt = $this->db->query($sql, [$date]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $sql = "INSERT INTO attendance (member_id, check_in, check_out) VALUES (?, ?, ?)";
        $params = [
            $data['member_id'],
            $data['check_in'],
            isset($data['check_out']) ? $data['check_out'] : null
        ];
        $this->db->query($sql, $params);
        return $this->db->lastInsertId();
    }
}