<?php
namespace App\Models;
use App\Database\Database;

class ClassModel {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll($filters = []) {
        return $this->getClasses($filters);
    }
    
    public function getById($id) {
        $classes = $this->getClasses(['id' => $id], true);
        return $classes ? $classes[0] : null;
    }
    
    private function getClasses($filters = [], $singleRecord = false) {
        $sql = "SELECT c.id, c.class_name, c.max_capacity, c.description, ct.name as type, 
                t.id as instructor_id, u.first_name, u.last_name, t.rating, t.reviews_count,
                (SELECT COUNT(*) FROM class_enrollments ce WHERE ce.class_id = c.id AND ce.status = 'active') as enrolled
                FROM classes c
                JOIN class_types ct ON c.class_type_id = ct.id
                JOIN trainers t ON c.instructor_id = t.id
                JOIN users u ON t.user_id = u.id
                WHERE 1=1";
        
        $params = [];
        
        if (!empty($filters['id'])) {
            $sql .= " AND c.id = ?";
            $params[] = $filters['id'];
        }
        if ($singleRecord) {
            $sql .= " ORDER BY c.class_name ASC LIMIT 1";
        } else {
            $sql .= " ORDER BY c.class_name ASC";
        }
        
        if (!empty($filters['type'])) {
            $sql .= " AND ct.name = ?";
            $params[] = $filters['type'];
        }
        
        if (!empty($filters['instructor_id'])) {
            $sql .= " AND t.id = ?";
            $params[] = $filters['instructor_id'];
        }
        
        $stmt = $this->db->query($sql, $params);
        $classes = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        // Process each class
        foreach ($classes as &$class) {
            $class['schedule'] = $this->getSchedule($class['id']);
            $class['instructor'] = [
                'id' => $class['instructor_id'],
                'name' => $class['first_name'] . ' ' . $class['last_name'],
                'rating' => $class['rating'],
                'reviews_count' => $class['reviews_count']
            ];
            unset($class['first_name'], $class['last_name'], $class['instructor_id'], $class['rating'], $class['reviews_count']);
        }
        
        return $classes;
    }
    
    private function getSchedule($classId) {
        $sql = "SELECT day_of_week, start_time, end_time FROM class_schedule 
                WHERE class_id = ? 
                ORDER BY FIELD(day_of_week, 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'), start_time";
        $stmt = $this->db->query($sql, [$classId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}