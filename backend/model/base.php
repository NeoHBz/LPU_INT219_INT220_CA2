<?php

require_once 'core/database_connector.php';

class Model {
    protected $table;
    protected $db;

    public function __construct() {
        $this->db = null; // Do not connect immediately
    }

    protected function getDb() {
        if ($this->db === null) {
            $this->db = Database_Connector::getInstance()->connect();
        }
        return $this->db;
    }

    public function find($id) {
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $db = $this->getDb();
        $columns = implode(',', array_keys($data));
        $placeholders = implode(',', array_fill(0, count($data), '?'));
        $stmt = $db->prepare("INSERT INTO {$this->table} ($columns) VALUES ($placeholders)");
        return $stmt->execute(array_values($data));
    }

    public function where($column, $value) {
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT * FROM {$this->table} WHERE $column = ?");
        $stmt->execute([$value]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}