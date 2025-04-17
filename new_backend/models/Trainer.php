<?php

namespace App\Models;

use App\Database\Database;

class Trainer {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function findAll() {
        $sql = "SELECT t.id, t.rating, t.reviews_count as reviews, t.bio, 
                    u.id as user_id, u.first_name, u.last_name, u.username, u.email, u.created_at
                FROM trainers t
                JOIN users u ON t.user_id = u.id";
        $stmt = $this->db->query($sql);
        $trainers = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    
        // Fetch specialities for each trainer
        foreach ($trainers as &$trainer) {
            $trainer['specialities'] = $this->getSpecialities($trainer['id']);
            $trainer = $this->formatTrainerData($trainer);
        }
    
        return $trainers;
    }
    
    private function getSpecialities($trainerId) {
        $sql = "SELECT s.name FROM trainer_specialities ts
                JOIN specialities s ON ts.speciality_id = s.id
                WHERE ts.trainer_id = ?";
        $stmt = $this->db->query($sql, [$trainerId]);
        return $stmt->fetchAll(\PDO::FETCH_COLUMN);
    }
    
    private function formatTrainerData($trainer) {
        return [
            'id' => $trainer['id'],
            'specialities' => $trainer['specialities'],
            'rating' => (float) $trainer['rating'],
            'reviews' => (int) $trainer['reviews'],
            'bio' => $trainer['bio'],
            'user' => [
                'id' => $trainer['user_id'],
                'name' => $trainer['first_name'] . ' ' . $trainer['last_name'],
                'username' => $trainer['username'],
                'email' => $trainer['email'],
                'created_at' => $trainer['created_at']
            ]
        ];
    }
    public function findById($id) {
        $sql = "SELECT t.id, t.rating, t.reviews_count as reviews, t.bio, 
                u.id as user_id, u.first_name, u.last_name, u.username, u.email, u.created_at
                FROM trainers t
                JOIN users u ON t.user_id = u.id
                WHERE t.id = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$id]);
        $trainer = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        if (!$trainer) {
            return null;
        }
        // Fetch specialities for this trainer
        $trainer['specialities'] = $this->getSpecialities($trainer['id']);
        return $this->formatTrainerData($trainer);
    }
}
