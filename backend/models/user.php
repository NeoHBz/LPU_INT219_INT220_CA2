<?php
require_once __DIR__ . '/../core/database_connector.php';

/**
 * User Model
 * Handles database operations for users
 */
class User {
    private $db;
    
    /**
     * Constructor initializes database connection
     */
    public function __construct() {
        // Use the Database_Connector singleton for connection management
        $dbConnector = Database_Connector::getInstance();
        $this->db = $dbConnector->connect();
        
        if (!$this->db) {
            throw new Exception("Failed to connect to database");
        }
    }
    
    /**
     * Create a new user
     * 
     * @param array $data User data (username, password, email)
     * @return bool Success or failure
     */
    public function create($data) {
        try {
            $stmt = $this->db->prepare('INSERT INTO users (username, password, email) VALUES (:username, :password, :email)');
            return $stmt->execute([
                'username' => $data['username'],
                'password' => $data['password'],
                'email' => $data['email']
            ]);
        } catch (PDOException $e) {
            // Log the error
            error_log($e->getMessage());
            return false;
        }
    }
    
    /**
     * Find user by username
     * 
     * @param string $username Username to find
     * @return array|bool User data or false if not found
     */
    public function findByUsername($username) {
        try {
            $stmt = $this->db->prepare('SELECT * FROM users WHERE username = :username');
            $stmt->execute(['username' => $username]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    
    // Add more methods as needed
}
?>