# API Routes Documentation

This document outlines the potential API routes for the FitTrack - Fitness Center Management System. These routes can be integrated to replace the current hardcoded data in the project.

---

## **1. Authentication**

### Routes
- **POST `/auth/login`**  
  Authenticate users and return a session token.

- **POST `/auth/logout`**  
  Invalidate the current session.

- **POST `/auth/register`**  
  Register a new user.

- **GET `/auth/me`**  
  Fetch the current authenticated user's profile.
User: {
    "id": string,
    "username": string,
    "email": string,
    "first_name": string,
    "last_name": string,
    "created_at": datetime,
    "updated_at": datetime,
}
---

## **2. Members**

### Routes
- **GET `/members`**  
  Fetch a list of all members with filters (e.g., active, inactive, expired).

- **GET `/members/:id`**  
  Fetch details of a specific member.

- **POST `/members`**  
  Add a new member.

{
    user: User;
    membershipType: 'basic' | 'standard' | 'premium';
    expiryDate: datetime;
}

<!-- 
- **PUT `/members/:id`**  
  Update an existing member's details.

- **DELETE `/members/:id`**  
  Remove a member. -->

---

## **3. Memberships**

### Routes
- **GET `/plans`**  
  Fetch all membership plans.
{
    "1 month": "1000",
    "3 month": "2500",
    "6 month": "4000",
    "12 month": "6500"
}

- **GET `/memberships/:id`**  
  Fetch details of a specific membership plan.
{
    "current": "1 month",
    "lastRenewed": "10-02-2024" new Date()
}

---

## **4. Classes**

### Routes
- **GET `/classes`**  
  Fetch all classes with filters (e.g., upcoming, popular).
{
    id: string;
    className: string;
    type: "Strength" | "Yoga"...
    instructor: {
        id: string;
        name: string;
        ...
    }
    schedule: [
        {
            "Day": {
                "start": time
                "end": time
            }
        }
    ]
    capacity: integer
    enrolled: integer
}
- **GET `/classes/:id`**  
  Fetch details of a specific class.

<!-- - **POST `/classes`**  
  Add a new class. -->

<!-- - **DELETE `/classes/:id`**  
  Delete a class. -->

---

## **5. Trainers**

### Routes
- **GET `/trainers`**  
  Fetch all trainers.
{
    id: string;
    specialities: [],
    rating: double;
    reviews: int;
    bio: string;
    user: {
        name: string;
        image: string;
        ...
    }
}
- **GET `/trainers/:id`**  
  Fetch details of a specific trainer.

<!-- - **POST `/trainers`**  
  Add a new trainer. -->

<!-- - **PUT `/trainers/:id`**  
  Update an existing trainer's profile.

- **DELETE `/trainers/:id`**  
  Remove a trainer. -->

---

## **6. Attendance**

### Routes
- **GET `/attendance`**  
  Fetch attendance records with filters (e.g., daily, weekly, monthly).

- **POST `/attendance`**  
  Add a new attendance record.

- **PUT `/attendance/:id`**  
  Update an attendance record.

- **DELETE `/attendance/:id`**  
  Delete an attendance record.

---

## **7. Equipment**

### Routes
- **GET `/equipment`**  
  Fetch all gym equipment.

- **GET `/equipment/:id`**  
  Fetch details of a specific equipment item.

- **POST `/equipment`**  
  Add a new equipment item.

- **PUT `/equipment/:id`**  
  Update an existing equipment item.

- **DELETE `/equipment/:id`**  
  Remove an equipment item.

- **GET `/equipment/maintenance`**  
  Fetch maintenance schedules.

- **POST `/equipment/maintenance`**  
  Schedule maintenance for equipment.

---

## **8. Dashboard Analytics**

### Routes
- **GET `/dashboard/overview`**  
  Fetch an overview of key metrics (e.g., total members, active classes).

- **GET `/dashboard/attendance`**  
  Fetch attendance analytics.

- **GET `/dashboard/memberships`**  
  Fetch membership statistics.

- **GET `/dashboard/classes`**  
  Fetch class-related analytics.

---

## **9. Payments**

### Routes
- **GET `/payments`**  
  Fetch payment history for a user.

- **POST `/payments`**  
  Process a new payment.

- **GET `/payments/:id`**  
  Fetch details of a specific payment.

---

## **10. Notifications**

### Routes
- **GET `/notifications`**  
  Fetch all notifications for the user.

- **POST `/notifications`**  
  Create a new notification.

- **DELETE `/notifications/:id`**  
  Delete a notification.

---

## Integration Steps

1. Replace hardcoded data in components with API calls using `fetch` or a library like `axios`.
2. Use React Query or SWR for data fetching and caching.
3. Implement error handling and loading states for API calls.
4. Secure API routes with authentication and authorization middleware.

---

## Notes

- These routes are suggestions based on the current project structure and features.
- Adjustments may be required based on the backend implementation and specific requirements.

---

Save this content as `API_ROUTES.md` in your project directory.