<?php

namespace App\Models;

use App\Database\Database;
// - **GET `/members`**  
//   Fetch a list of all members with filters (e.g., active, inactive, expired).

// - **GET `/members/:id`**  
//   Fetch details of a specific member.

// - **POST `/members`**  
//   Add a new member.

class Memberships {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function findAll(): array {
        $sql = "SELECT m.*, u.id as user_id, u.username, u.first_name, u.last_name, 
                u.email, u.phone_number, u.address 
                FROM memberships m
                JOIN users u ON m.user_id = u.id";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}