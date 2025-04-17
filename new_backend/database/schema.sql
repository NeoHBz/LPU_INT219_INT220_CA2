CREATE DATABASE IF NOT EXISTS fitness;

USE fitness;

-- Create users table (existing)
CREATE TABLE
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        address VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

-- Create plans table (existing)
CREATE TABLE
    IF NOT EXISTS plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        plan_name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        membership_type ENUM ('basic', 'standard', 'premium', 'professional') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Create members table (existing)
CREATE TABLE
    IF NOT EXISTS members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        plan_id INT NOT NULL,
        expiry_date DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES plans (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

-- Create trainers table
CREATE TABLE
    IF NOT EXISTS trainers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        bio TEXT,
        rating DECIMAL(3, 2) DEFAULT 0.0,
        reviews_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

-- Create specialities table
CREATE TABLE
    IF NOT EXISTS specialities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

-- Create trainer_specialities join table
CREATE TABLE
    IF NOT EXISTS trainer_specialities (
        trainer_id INT NOT NULL,
        speciality_id INT NOT NULL,
        PRIMARY KEY (trainer_id, speciality_id),
        FOREIGN KEY (trainer_id) REFERENCES trainers (id) ON DELETE CASCADE,
        FOREIGN KEY (speciality_id) REFERENCES specialities (id) ON DELETE CASCADE
    );

-- Create class_types table
CREATE TABLE
    IF NOT EXISTS class_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

-- Create classes table
CREATE TABLE
    IF NOT EXISTS classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_name VARCHAR(100) NOT NULL,
        class_type_id INT NOT NULL,
        trainer_id INT NOT NULL,
        max_capacity INT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (class_type_id) REFERENCES class_types (id) ON DELETE RESTRICT,
        FOREIGN KEY (trainer_id) REFERENCES trainers (id) ON DELETE RESTRICT
    );

-- Create class_schedule table
CREATE TABLE
    IF NOT EXISTS class_schedule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_id INT NOT NULL,
        day_of_week ENUM (
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ) NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes (id) ON DELETE CASCADE
    );

-- Create class_enrollments table
CREATE TABLE
    IF NOT EXISTS class_enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        class_id INT NOT NULL,
        member_id INT NOT NULL,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM ('active', 'cancelled', 'completed') DEFAULT 'active',
        FOREIGN KEY (class_id) REFERENCES classes (id) ON DELETE CASCADE,
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE,
        UNIQUE KEY (class_id, member_id)
    );

-- Create equipment_categories table
CREATE TABLE
    IF NOT EXISTS equipment_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

-- Create equipment table
CREATE TABLE
    IF NOT EXISTS equipment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category_id INT NOT NULL,
        purchase_date DATE NOT NULL,
        serial_number VARCHAR(100) UNIQUE,
        `condition` ENUM (
            'excellent',
            'good',
            'fair',
            'poor',
            'out-of-service'
        ) DEFAULT 'excellent',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES equipment_categories (id) ON DELETE RESTRICT
    );

-- Create equipment_maintenance table
CREATE TABLE
    IF NOT EXISTS equipment_maintenance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        equipment_id INT NOT NULL,
        maintenance_date DATE NOT NULL,
        performed_by VARCHAR(100),
        description TEXT NOT NULL,
        cost DECIMAL(10, 2) DEFAULT 0.0,
        status ENUM (
            'scheduled',
            'in-progress',
            'completed',
            'cancelled'
        ) DEFAULT 'scheduled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (equipment_id) REFERENCES equipment (id) ON DELETE CASCADE
    );

-- Create attendance table
CREATE TABLE
    IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        member_id INT NOT NULL,
        check_in DATETIME NOT NULL,
        check_out DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE
    );

-- Create payments table
CREATE TABLE
    IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        member_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_date DATETIME NOT NULL,
        payment_method ENUM (
            'credit_card',
            'debit_card',
            'cash',
            'bank_transfer'
        ) NOT NULL,
        status ENUM ('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
        transaction_id VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE
    );

-- Create notifications table
CREATE TABLE
    IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        notification_type ENUM (
            'system',
            'membership',
            'class',
            'payment',
            'maintenance'
        ) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

-- Create personal_training_sessions table
CREATE TABLE
    IF NOT EXISTS personal_training_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trainer_id INT NOT NULL,
        member_id INT NOT NULL,
        session_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        status ENUM ('scheduled', 'completed', 'cancelled', 'no-show') DEFAULT 'scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (trainer_id) REFERENCES trainers (id) ON DELETE CASCADE,
        FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE
    );