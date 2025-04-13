<?php
require_once __DIR__ . '/../models/user.php';
require_once __DIR__ . '/../utils/RequestUtil.php';
require_once __DIR__ . '/../utils/ResponseUtil.php';
require_once __DIR__ . '/../utils/ValidationUtil.php';

/**
 * User Controller
 * Handles user-related operations
 */
class UserController {
    private $userModel;
    
    /**
     * Constructor initializes the User model
     */
    public function __construct() {
        $this->userModel = new User();
    }
    
    /**
     * Register a new user
     */
    public function register() {
        try {
            // Get and validate input data
            $data = RequestUtil::getJsonData();
            ValidationUtil::validateRegisterData($data);
            
            // Process registration
            $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
            $result = $this->userModel->create([
                'username' => $data['username'],
                'password' => $hashed_password,
                'email' => $data['email'],
            ]);
            
            // Return response
            if ($result) {
                ResponseUtil::sendSuccess(['message' => 'User registered successfully'], 201);
            } else {
                ResponseUtil::sendError('Failed to register user', 500);
            }
        } catch (Exception $e) {
            ResponseUtil::sendError($e->getMessage(), 400);
        }
    }

    /**
     * Login user
     */
    public function login() {
        try {
            $data = RequestUtil::getJsonData();
            ValidationUtil::validateLoginData($data);
            
            // Add login implementation
            // ...
            
            ResponseUtil::sendSuccess(['message' => 'Login successful']);
        } catch (Exception $e) {
            ResponseUtil::sendError($e->getMessage(), 400);
        }
    }
    
    // Add more user-related methods as needed
}