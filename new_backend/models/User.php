<?php

namespace App\Models;

use App\Database\Database;

class User {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function create($data) {
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        
        $sql = "INSERT INTO users (username, email, password, first_name, last_name, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
        $params = [$data['username'], $data['email'], $hashedPassword, $data['first_name'], $data['last_name']];
        
        $this->db->query($sql, $params);
        return $this->db->lastInsertId();
    }
    public function findByEmail($email) {
        $sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$email]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function findById($id) {
        $sql = "SELECT id, username, email, first_name, last_name, created_at, updated_at FROM users WHERE id = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function update($id, $data) {
        $fields = [];
        $params = [];
        
        foreach ($data as $key => $value) {
            if ($key !== 'password' && !empty($value)) {
                $fields[] = "$key = ?";
                $params[] = $value;
            }
        }
        
        if (!empty($data['password'])) {
            $fields[] = "password = ?";
            $params[] = password_hash($data['password'], PASSWORD_BCRYPT);
        }
        
        if (empty($fields)) {
            return false;
        }
        
        $fields[] = "updated_at = NOW()";
        
        $params[] = $id;
        
        $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?";
        
        $this->db->query($sql, $params);
        return true;
    }
}