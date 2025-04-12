<?php
require_once 'config/env_parser.php';
require_once 'core/database_connector.php';

$envParser = new EnvParser([
    "database" => ["host", "db_name", "username", "password"]
]);

if (!$envParser->parse() || !$envParser->isValid()) {
    error_log("Error: Unable to parse .env file or missing variables.");
    exit(1);
}

// $db = Database_Connector::getInstance();
// $db_conn = $db->connect();

// if (!$db_conn) {
//     error_log("Error: Failed to connect to the database.");
//     exit(1);
// }

// $db->disconnect();