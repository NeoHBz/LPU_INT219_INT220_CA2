<?php

class Database_Connector {
    private static ?Database_Connector $instance = null;
    private ?PDO $conn = null;

    private string $host;
    private string $db_name;
    private string $username;
    private string $password;
    private function __construct() {
        $envParser = new EnvParser([
            "database" => ["host", "db_name", "username", "password"]
        ]);

        if (!$envParser->parse() || !$envParser->isValid()) {
            error_log("Error: Unable to parse .env file or missing variables.");
            exit(1);
        }

        $this->host = $envParser->get("host");
        $this->db_name = $envParser->get("db_name");
        $this->username = $envParser->get("username");
        $this->password = $envParser->get("password");
    }
    public static function getInstance(): Database_Connector {
        if (self::$instance === null) {
            self::$instance = new Database_Connector();
        }
        return self::$instance;
    }
    public function connect(): ?PDO {
        if ($this->conn === null) {
            try {
                // Log connection attempts for debugging
                error_log("Attempting to connect to MySQL: {$this->host}, {$this->db_name}, {$this->username}");
                
                // Try various connection methods
                $dsn = "mysql:host={$this->host};dbname={$this->db_name}";
                $this->conn = new PDO($dsn, $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                error_log("Connection Error: " . $e->getMessage());
                
                // Try socket connection as fallback
                try {
                    $this->conn = new PDO(
                        "mysql:unix_socket=/tmp/mysql.sock;dbname={$this->db_name}",
                        $this->username,
                        $this->password
                    );
                    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                } catch (PDOException $e2) {
                    error_log("Socket Connection Error: " . $e2->getMessage());
                    return null;
                }
            }
        }
        return $this->conn;
    }
    public function disconnect(): void {
        $this->conn = null;
    }
}
?>