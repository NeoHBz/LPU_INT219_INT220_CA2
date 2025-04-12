<?php
require_once __DIR__ . '/../models/User.php';

$userModel = new User();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['route'] === 'register') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    $email = $data['email'] ?? '';

    if ($username && $password && $email) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $result = $userModel->create([
            'username' => $username,
            'password' => $hashed_password,
            'email' => $email,
        ]);

        if ($result) {
            echo json_encode(['message' => 'User registered successfully']);
        } else {
            echo json_encode(['error' => 'Failed to register user']);
        }
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}