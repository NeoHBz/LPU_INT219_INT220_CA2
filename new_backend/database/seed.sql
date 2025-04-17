USE fitness;

-- Existing data
INSERT INTO `users` (`created_at`, `email`, `first_name`, `id`, `last_name`, `password`, `updated_at`, `username`, `phone_number`, `address`) 
VALUES ('2025-04-15 01:26:58', 'saurav@fit.com', 'Saurav', 1, 'Lal', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', NULL, 'saurav', '1234567890', 'Green Valley, Jalandhar');

INSERT INTO `plans` (`created_at`, `duration`, `id`, `membership_type`, `plan_name`, `price`, `updated_at`)
VALUES ('2025-04-15 01:26:58', '1 Month', 1, 'basic', 'Basic Plan', 999.00, NULL),
       ('2025-04-15 01:26:58', '3 Months', 2, 'standard', 'Standard Plan', 2499.00, NULL),
       ('2025-04-15 01:26:58', '6 Months', 3, 'premium', 'Premium Plan', 4500.00, NULL),
       ('2025-04-15 01:26:58', '12 Months', 4, 'professional', 'Professional Plan', 8000.00, NULL);

INSERT INTO members (`created_at`, `expiry_date`, `id`, `plan_id`, `updated_at`, `user_id`)
VALUES ('2025-04-15 01:26:58', '2025-05-15 01:26:58', 1, 1, NULL, 1);

-- Additional users
INSERT INTO `users` (`email`, `first_name`, `last_name`, `password`, `username`, `phone_number`, `address`) VALUES
('rahul@fit.com', 'Rahul', 'Sharma', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'rahul', '9876543210', '123 Main St, Mumbai'),
('priya@fit.com', 'Priya', 'Singh', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'priya', '8765432109', '456 Park Ave, Delhi'),
('amit@fit.com', 'Amit', 'Patel', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'amit', '7654321098', '789 Oak Dr, Bangalore'),
('neha@fit.com', 'Neha', 'Gupta', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'neha', '6543210987', '321 Pine Rd, Chennai'),
('vikram@fit.com', 'Vikram', 'Joshi', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'vikram', '5432109876', '654 Cedar Ln, Pune'),
('ananya@fit.com', 'Ananya', 'Kapoor', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'ananya', '4321098765', '987 Elm St, Hyderabad'),
('raj@fit.com', 'Raj', 'Malhotra', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'raj', '3210987654', '159 Maple Ave, Kolkata'),
('deepika@fit.com', 'Deepika', 'Kumar', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'deepika', '2109876543', '753 Birch Rd, Jaipur'),
('arjun@fit.com', 'Arjun', 'Reddy', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'arjun', '1098765432', '246 Spruce Dr, Ahmedabad'),
('john@fit.com', 'John', 'Trainer', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'john_t', '0987654321', '159 Fitness St, Mumbai'),
('sara@fit.com', 'Sara', 'Coach', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'sara_c', '9876543210', '357 Gym Ave, Delhi'),
('mike@fit.com', 'Mike', 'Fitness', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'mike_f', '8765432109', '852 Muscle Rd, Bangalore'),
('lisa@fit.com', 'Lisa', 'Instructor', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', 'lisa_i', '7654321098', '963 Trainer St, Chennai');

-- Additional members
INSERT INTO `members` (`user_id`, `plan_id`, `expiry_date`) VALUES
(2, 2, DATE_ADD(NOW(), INTERVAL 3 MONTH)),
(3, 3, DATE_ADD(NOW(), INTERVAL 6 MONTH)),
(4, 4, DATE_ADD(NOW(), INTERVAL 12 MONTH)),
(5, 1, DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(6, 2, DATE_ADD(NOW(), INTERVAL 3 MONTH)),
(7, 3, DATE_ADD(NOW(), INTERVAL 6 MONTH)),
(8, 4, DATE_ADD(NOW(), INTERVAL 12 MONTH)),
(9, 1, DATE_ADD(NOW(), INTERVAL 1 MONTH));

-- Trainers
INSERT INTO `trainers` (`user_id`, `bio`, `rating`, `reviews_count`) VALUES
(10, 'Certified personal trainer with 10 years of experience specializing in strength training and weight loss.', 4.9, 156),
(11, 'Yoga instructor and nutritionist with a holistic approach to fitness and wellbeing.', 4.8, 132),
(12, 'Sports medicine specialist and performance coach for athletes of all levels.', 4.7, 98),
(13, 'Group fitness expert with certifications in HIIT, Zumba, and aerobics.', 4.6, 87);

-- Specialities
INSERT INTO `specialities` (`name`, `description`) VALUES
('Strength Training', 'Focus on building muscle mass and strength through resistance training.'),
('Yoga', 'Mind-body practice combining physical poses, breathing techniques, and meditation.'),
('HIIT', 'High-intensity interval training for maximum calorie burn in short time.'),
('Weight Loss', 'Programs designed specifically for fat loss and body transformation.'),
('Nutrition', 'Expert guidance on dietary needs for fitness goals.'),
('Sports Performance', 'Training aimed at improving athletic performance in specific sports.'),
('Rehabilitation', 'Exercise programs to recover from injuries or surgeries.'),
('Senior Fitness', 'Specialized training for older adults focusing on mobility and strength.'),
('Bodybuilding', 'Training specifically for muscle hypertrophy and physique development.');

-- Trainer specialities
INSERT INTO `trainer_specialities` (`trainer_id`, `speciality_id`) VALUES
(1, 1), (1, 4), (1, 9), -- John: Strength, Weight Loss, Bodybuilding
(2, 2), (2, 5), (2, 8), -- Sara: Yoga, Nutrition, Senior Fitness
(3, 1), (3, 6), (3, 7), -- Mike: Strength, Sports Performance, Rehabilitation
(4, 3), (4, 4), (4, 5); -- Lisa: HIIT, Weight Loss, Nutrition

-- Class types
INSERT INTO `class_types` (`name`, `description`) VALUES
('Strength', 'Focus on resistance training to build muscle and strength.'),
('Cardio', 'High-energy workouts to improve cardiovascular health and burn calories.'),
('Yoga', 'Mind-body exercise combining physical poses, breathing, and meditation.'),
('HIIT', 'High-intensity interval training alternating between intense exercise and rest.'),
('Pilates', 'Low-impact exercise focusing on core strength, posture, and flexibility.'),
('Zumba', 'Dance fitness program combining Latin and international music with dance movements.'),
('Spinning', 'Indoor cycling workout on stationary bikes with varying intensity.'),
('Body Pump', 'Weight-based group-fitness program using barbells and adjustable weights.');

-- Classes
INSERT INTO `classes` (`class_name`, `class_type_id`, `instructor_id`, `max_capacity`, `description`) VALUES
('Morning Power Hour', 1, 1, 20, 'Start your day strong with this energizing strength training session.'),
('Zen Flow Yoga', 3, 2, 15, 'Find your balance and peace with flowing yoga movements and meditation.'),
('Athletic Performance', 1, 3, 12, 'Advanced strength and conditioning for athletes looking to improve performance.'),
('Burn & Sculpt HIIT', 4, 4, 25, 'High-intensity interval training designed to burn fat and sculpt muscles.'),
('Spinning Challenge', 7, 1, 20, 'Challenging indoor cycling session with hills, sprints, and endurance training.'),
('Core Pilates', 5, 2, 15, 'Focus on building a strong core and improving posture and flexibility.'),
('Latin Dance Party', 6, 4, 30, 'Fun and energetic Zumba class combining Latin rhythms and easy-to-follow moves.'),
('Total Body Pump', 8, 3, 18, 'Full-body workout using barbells and weights to tone and strengthen all muscle groups.');

-- Class schedules
INSERT INTO `class_schedule` (`class_id`, `day_of_week`, `start_time`, `end_time`) VALUES
(1, 'Monday', '06:00:00', '07:00:00'),
(1, 'Wednesday', '06:00:00', '07:00:00'),
(1, 'Friday', '06:00:00', '07:00:00'),
(2, 'Tuesday', '08:00:00', '09:15:00'),
(2, 'Thursday', '08:00:00', '09:15:00'),
(2, 'Saturday', '09:00:00', '10:15:00'),
(3, 'Monday', '18:00:00', '19:30:00'),
(3, 'Thursday', '18:00:00', '19:30:00'),
(4, 'Tuesday', '17:30:00', '18:30:00'),
(4, 'Friday', '17:30:00', '18:30:00'),
(5, 'Monday', '12:00:00', '13:00:00'),
(5, 'Wednesday', '12:00:00', '13:00:00'),
(5, 'Friday', '12:00:00', '13:00:00'),
(6, 'Tuesday', '10:00:00', '11:00:00'),
(6, 'Thursday', '10:00:00', '11:00:00'),
(7, 'Wednesday', '19:00:00', '20:00:00'),
(7, 'Saturday', '11:00:00', '12:00:00'),
(8, 'Monday', '19:30:00', '20:30:00'),
(8, 'Wednesday', '19:30:00', '20:30:00');

-- Class enrollments
INSERT INTO `class_enrollments` (`class_id`, `member_id`, `status`) VALUES
(1, 1, 'active'),
(1, 2, 'active'),
(1, 5, 'active'),
(2, 3, 'active'),
(2, 6, 'active'),
(3, 4, 'active'),
(3, 7, 'active'),
(4, 1, 'active'),
(4, 8, 'active'),
(5, 2, 'active'),
(5, 5, 'active'),
(6, 3, 'active'),
(6, 6, 'active'),
(7, 4, 'active'),
(7, 7, 'active'),
(8, 1, 'active'),
(8, 8, 'active');

-- Equipment categories
INSERT INTO `equipment_categories` (`name`, `description`) VALUES
('Cardio', 'Equipment for cardiovascular workouts.'),
('Strength', 'Equipment for strength training and weight lifting.'),
('Functional', 'Equipment for functional fitness and bodyweight exercises.'),
('Free Weights', 'Dumbbells, barbells, and weight plates.'),
('Machines', 'Fixed-path resistance machines.');

-- Equipment
INSERT INTO `equipment` (`name`, `category_id`, `purchase_date`, `serial_number`, `condition`, `notes`) VALUES
('Treadmill Life Fitness 95T', 1, '2024-01-15', 'LF95T-10025', 'excellent', 'Premium treadmill with advanced features.'),
('Elliptical Precor EFX 835', 1, '2024-01-15', 'P835-5622', 'excellent', 'Commercial-grade elliptical with adjustable incline.'),
('Stationary Bike Keiser M3i', 1, '2024-01-16', 'KM3i-78541', 'excellent', 'Indoor cycling bike with electronic display.'),
('Squat Rack Rogue R-3', 2, '2024-01-20', 'RR3-15587', 'good', 'Heavy-duty power rack with pull-up bar.'),
('Leg Press Machine', 5, '2024-01-22', 'LP-72369', 'excellent', '45-degree leg press with 400lb weight capacity.'),
('Smith Machine', 5, '2024-01-22', 'SM-41256', 'good', 'Commercial-grade Smith machine with safety stops.'),
('Adjustable Bench', 2, '2024-01-25', 'AB-32654', 'excellent', 'Adjustable from flat to 85-degree incline.'),
('Dumbbells Set (5-50 lbs)', 4, '2024-01-28', 'DS-50-123', 'good', 'Complete set of rubber hex dumbbells in 5lb increments.'),
('Olympic Barbell 20kg', 4, '2024-01-28', 'OB20-4578', 'excellent', 'Olympic standard 20kg barbell with needle bearings.'),
('Weight Plates Set (2.5-25kg)', 4, '2024-01-28', 'WP-250-789', 'good', 'Rubber-coated Olympic weight plates.'),
('TRX Suspension Trainer', 3, '2024-02-05', 'TRX-85214', 'excellent', 'Professional suspension training system.'),
('Battle Ropes', 3, '2024-02-05', 'BR-36962', 'excellent', '50ft battle ropes for high-intensity cardio.'),
('Rowing Machine Concept2', 1, '2024-02-10', 'C2-47852', 'excellent', 'Commercial-grade air resistance rowing machine.'),
('Cable Crossover Machine', 5, '2024-02-15', 'CC-65478', 'excellent', 'Dual pulley system for versatile exercises.'),
('Stair Climber StairMaster', 1, '2024-02-20', 'SM-14785', 'good', 'Commercial-grade stair climbing machine.');

-- Equipment maintenance
INSERT INTO `equipment_maintenance` (`equipment_id`, `maintenance_date`, `performed_by`, `description`, `cost`, `status`) VALUES
(1, '2025-03-15', 'Tech Support Inc.', 'Regular maintenance and belt adjustment', 150.00, 'completed'),
(2, '2025-03-15', 'Tech Support Inc.', 'Regular maintenance and lubrication', 125.00, 'completed'),
(3, '2025-03-20', 'Fitness Equipment Services', 'Calibration and console update', 100.00, 'completed'),
(5, '2025-04-10', 'Heavy Duty Repairs', 'Cable replacement and safety check', 200.00, 'completed'),
(6, '2025-04-25', 'Tech Support Inc.', 'Scheduled maintenance', 175.00, 'scheduled'),
(13, '2025-05-10', 'Fitness Equipment Services', 'Chain maintenance and monitor calibration', 120.00, 'scheduled'),
(14, '2025-05-15', 'Heavy Duty Repairs', 'Pulley system inspection and cable check', 160.00, 'scheduled');

-- Attendance records
INSERT INTO `attendance` (`member_id`, `check_in`, `check_out`) VALUES
(1, '2025-04-01 07:30:00', '2025-04-01 09:15:00'),
(2, '2025-04-01 08:45:00', '2025-04-01 10:30:00'),
(3, '2025-04-01 17:00:00', '2025-04-01 19:00:00'),
(1, '2025-04-02 06:45:00', '2025-04-02 08:00:00'),
(4, '2025-04-02 12:30:00', '2025-04-02 14:15:00'),
(5, '2025-04-02 18:00:00', '2025-04-02 19:30:00'),
(1, '2025-04-03 07:30:00', '2025-04-03 09:00:00'),
(2, '2025-04-03 16:00:00', '2025-04-03 18:00:00'),
(6, '2025-04-03 10:15:00', '2025-04-03 11:45:00'),
(1, '2025-04-05 08:00:00', '2025-04-05 10:00:00'),
(3, '2025-04-05 09:30:00', '2025-04-05 11:30:00'),
(7, '2025-04-05 16:45:00', '2025-04-05 18:30:00'),
(1, '2025-04-06 07:15:00', '2025-04-06 08:45:00'),
(8, '2025-04-06 11:00:00', '2025-04-06 13:15:00'),
(4, '2025-04-06 17:30:00', '2025-04-06 19:45:00');

-- Payments
INSERT INTO `payments` (`member_id`, `amount`, `payment_date`, `payment_method`, `status`, `transaction_id`, `notes`) VALUES
(1, 999.00, '2025-03-15 10:30:00', 'credit_card', 'completed', 'TXN-45678912', 'Basic Plan - 1 Month'),
(2, 2499.00, '2025-02-10 09:15:00', 'debit_card', 'completed', 'TXN-78912345', 'Standard Plan - 3 Months'),
(3, 4500.00, '2025-01-05 14:45:00', 'bank_transfer', 'completed', 'TXN-12345678', 'Premium Plan - 6 Months'),
(4, 8000.00, '2025-03-01 11:00:00', 'credit_card', 'completed', 'TXN-23456789', 'Professional Plan - 12 Months'),
(5, 999.00, '2025-03-20 16:30:00', 'cash', 'completed', 'TXN-34567891', 'Basic Plan - 1 Month'),
(6, 2499.00, '2025-02-15 13:15:00', 'debit_card', 'completed', 'TXN-56789123', 'Standard Plan - 3 Months'),
(7, 4500.00, '2025-01-10 10:00:00', 'bank_transfer', 'completed', 'TXN-67891234', 'Premium Plan - 6 Months'),
(8, 8000.00, '2025-03-05 15:45:00', 'credit_card', 'completed', 'TXN-89123456', 'Professional Plan - 12 Months');

-- Notifications
INSERT INTO `notifications` (`user_id`, `title`, `message`, `is_read`, `notification_type`) VALUES
(1, 'Membership Expiring Soon', 'Your membership expires in 5 days. Renew now to avoid interruption.', FALSE, 'membership'),
(1, 'Class Reminder', 'Your Morning Power Hour class starts tomorrow at 6:00 AM.', FALSE, 'class'),
(2, 'Payment Confirmation', 'Your payment of ₹2499 has been processed successfully.', TRUE, 'payment'),
(3, 'New Class Available', 'We have added a new Yoga class on weekends. Check it out!', FALSE, 'system'),
(4, 'Trainer Session Confirmation', 'Your personal training session with Mike is confirmed for tomorrow at 5:00 PM.', TRUE, 'class'),
(5, 'Equipment Maintenance', 'The cable crossover machine will be unavailable for maintenance on April 25.', FALSE, 'maintenance');

-- Personal training sessions
INSERT INTO `personal_training_sessions` (`trainer_id`, `member_id`, `session_date`, `start_time`, `end_time`, `status`, `notes`) VALUES
(1, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '08:00:00', '09:00:00', 'scheduled', 'Focus on upper body strength'),
(2, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00:00', '15:00:00', 'scheduled', 'Yoga and flexibility session'),
(3, 4, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '17:00:00', '18:00:00', 'scheduled', 'Sports performance training'),
(4, 5, DATE_ADD(CURDATE(), INTERVAL 3 DAY), '10:00:00', '11:00:00', 'scheduled', 'HIIT and cardio workout'),
(1, 2, DATE_ADD(CURDATE(), INTERVAL 4 DAY), '16:00:00', '17:00:00', 'scheduled', 'Full body strength session'),
(3, 7, DATE_ADD(CURDATE(), INTERVAL 5 DAY), '09:00:00', '10:00:00', 'scheduled', 'Recovery and mobility work'),
(2, 6, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '18:00:00', '19:00:00', 'scheduled', 'Beginners yoga session'),
(4, 8, DATE_ADD(CURDATE(), INTERVAL 3 DAY), '15:00:00', '16:00:00', 'scheduled', 'Weight loss focused workout');