<?php

namespace App\Database;

class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $database = $_ENV['DB_DATABASE'] ?? 'fitness';
        $username = $_ENV['DB_USERNAME'] ?? 'root';
        $password = $_ENV['DB_PASSWORD'] ?? 'passwd0x00';

        try {
            $this->connection = new \PDO(
                "mysql:host=$host;dbname=$database;charset=utf8mb4",
                $username,
                $password
            );
            $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function query($sql, $params = [])
    {
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function lastInsertId()
    {
        return $this->connection->lastInsertId();
    }

    public function prepare($sql)
    {
        return $this->connection->prepare($sql);
    }
    public function beginTransaction()
    {
        return $this->connection->beginTransaction();
    }
    public function commit()
    {
        return $this->connection->commit();
    }
    public function rollBack()
    {
        return $this->connection->rollBack();
    }
    public function getConnection()
    {
        return $this->connection;
    }
    public function close()
    {
        $this->connection = null;
    }
}