USE fitness;

INSERT INTO `users` (`created_at`, `email`, `first_name`, `id`, `last_name`, `password`, `updated_at`, `username`, `phone_number`, `address`) 
VALUES ('2025-04-15 01:26:58', 'saurav@fit.com', 'Saurav', 1, 'Lal', '$2y$12$UhbDi8p44auMmhZjlGWmnucBY5Jia2A85BtDUXkt31fun28tfUK8G', NULL, 'saurav', '1234567890', 'Green Valley, Jalandhar');

INSERT INTO `members` (`created_at`, `expiry_date`, `id`, `membership_type`, `updated_at`, `user_id`) 
VALUES ('2025-04-15 23:29:03', '2025-05-15 01:26:58', 1, 'premium', NULL, 1);

INSERT INTO `plans` (`created_at`, `duration`, `id`, `membership_type`, `plan_name`, `price`, `updated_at`)
VALUES ('2025-04-15 01:26:58', '1 Month', 1, 'basic', 'Basic Plan', 999.00, NULL);
INSERT INTO `plans` (`created_at`, `duration`, `id`, `membership_type`, `plan_name`, `price`, `updated_at`)
VALUES ('2025-04-15 01:26:58', '3 Months', 2, 'standard', 'Standard Plan', 2499.00, NULL);
INSERT INTO `plans` (`created_at`, `duration`, `id`, `membership_type`, `plan_name`, `price`, `updated_at`)
VALUES ('2025-04-15 01:26:58', '6 Months', 3, 'premium', 'Premium Plan', 4500.00, NULL);
INSERT INTO `plans` (`created_at`, `duration`, `id`, `membership_type`, `plan_name`, `price`, `updated_at`)
VALUES ('2025-04-15 01:26:58', '12 Months', 4, 'professional', 'Professional Plan', 8000.00, NULL);
