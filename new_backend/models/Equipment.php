<?php

namespace App\Models;

use App\Database\Database;

class Equipment {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function getAll() {
        $sql = "SELECT e.*, c.name as category_name FROM equipment e JOIN equipment_categories c ON e.category_id = c.id";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function findById($id) {
        $sql = "SELECT e.*, c.name as category_name FROM equipment e JOIN equipment_categories c ON e.category_id = c.id WHERE e.id = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}