<?php

namespace App\Models;

use App\Database\Database;

class Plan {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function findAll(): array {
        $sql = "SELECT * FROM plans ORDER BY price ASC";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public function findById(int $id): ?array {
        $sql = "SELECT * FROM plans WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result ?: null;
    }
}