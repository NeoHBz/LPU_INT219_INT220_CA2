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
                    ) AS user,
                    JSON_OBJECT(
                        'id', p.id,
                        'plan_name', p.plan_name,
                        'price', p.price,
                        'duration', p.duration,
                        'membership_type', p.membership_type,
                        'created_at', p.created_at,
                        'updated_at', p.updated_at
                    ) AS plan
                FROM members m
                JOIN users u ON m.user_id = u.id
                JOIN plans p ON m.plan_id = p.id;
        ";
        $stmt = $this->db->query($sql);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Decode JSON fields
        foreach ($rows as &$row) {
            // $row['user'] = json_decode($row['user'], true);
            $row['plan'] = json_decode($row['plan'], true);
        }
        return $rows;
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