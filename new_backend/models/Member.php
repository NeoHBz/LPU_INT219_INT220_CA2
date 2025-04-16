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
        $sql = "SELECT 
                    m.id,
                    m.user_id,
                    m.plan_id,
                    m.expiry_date,
                    m.created_at,
                    m.updated_at,
                    JSON_OBJECT(
                        'username', u.username,
                        'first_name', u.first_name,
                        'last_name', u.last_name,
                        'email', u.email,
                        'phone_number', u.phone_number,
                        'address', u.address
                    ) AS user
                    FROM members m
                    JOIN users u ON m.user_id = u.id;
        ";
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