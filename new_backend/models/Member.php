<?php

namespace App\Models;

use App\Database\Database;
// - **GET `/members`**  
//   Fetch a list of all members with filters (e.g., active, inactive, expired).

// - **GET `/members/:id`**  
//   Fetch details of a specific member.

// - **POST `/members`**  
//   Add a new member.

class Member {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function findAll(): array {
        $sql = "SELECT m.*, u.id as user_id, u.username, u.first_name, u.last_name, 
                u.email, u.phone_number, u.address 
                FROM members m
                JOIN users u ON m.user_id = u.id";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function create(array $data): bool {
        $sql = "INSERT INTO members (user_id, plan_id, start_date, end_date, status) 
                VALUES (:user_id, :plan_id, :start_date, :end_date, :status)";
        $stmt = $this->db->query($sql);
        return $stmt->execute([
            'user_id' => $data['user_id'],
            'plan_id' => $data['plan_id'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'status' => $data['status']
        ]);
        
    }
}