<?php
/**
 * Validation Utility
 * Handles data validation across the application
 */
class ValidationUtil {
    /**
     * Validate user registration data
     * 
     * @param array $data Data to validate
     * @throws Exception If validation fails
     */
    public static function validateRegisterData($data) {
        // Check required fields
        self::validateRequiredFields($data, ['username', 'password', 'email']);
        
        // Validate email format
        self::validateEmail($data['email']);
        
        // Validate password
        self::validatePassword($data['password']);
        
        // Validate username
        if (strlen($data['username']) < 3) {
            throw new Exception("Username must be at least 3 characters long");
        }
    }
    
    /**
     * Validate user login data
     * 
     * @param array $data Data to validate
     * @throws Exception If validation fails
     */
    public static function validateLoginData($data) {
        // Check required fields for login
        self::validateRequiredFields($data, ['username', 'password']);
    }
    
    /**
     * Validate that all required fields are present
     * 
     * @param array $data Data to check
     * @param array $requiredFields List of required field names
     * @throws Exception If a required field is missing
     */
    public static function validateRequiredFields($data, $requiredFields) {
        foreach ($requiredFields as $field) {
            if (empty($data[$field] ?? '')) {
                throw new Exception("Missing required field: {$field}");
            }
        }
    }
    
    /**
     * Validate email format
     * 
     * @param string $email Email to validate
     * @throws Exception If email format is invalid
     */
    public static function validateEmail($email) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format");
        }
    }
    
    /**
     * Validate password strength
     * 
     * @param string $password Password to validate
     * @throws Exception If password doesn't meet requirements
     */
    public static function validatePassword($password) {
        // Check password length
        if (strlen($password) < 8) {
            throw new Exception("Password must be at least 8 characters long");
        }
        
        // You can add more password validation rules here
        // For example, requiring special characters, numbers, etc.
    }
}