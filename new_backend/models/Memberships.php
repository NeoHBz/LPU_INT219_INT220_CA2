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
        $sql = "SELECT * FROM memberships";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}