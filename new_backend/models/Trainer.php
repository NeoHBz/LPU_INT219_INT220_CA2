<?php

namespace App\Models;

use App\Database\Database;
use App\Utils\Response;

class Trainer {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function findAll(): array {
        $sql = "SELECT * FROM trainers";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function findById($id): ?array {
        $sql = "SELECT * FROM trainers WHERE id = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
