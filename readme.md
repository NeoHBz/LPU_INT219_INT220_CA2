## Fitness Center Management System

Create a website for gym management.
Features include:
- member profiles
- membership tracking
- class schedulin
- trainer assignments
- equipment maintenance logs
- attendance tracking
- membership renewals

```
Frontend: Vite App
└── Pages
    ├── Home (Landing page with gym info, featured classes)
    ├── Login/Signup (Member authentication)
    ├── Profile (Member dashboard, personal info)
    ├── Members (Admin member management)
    ├── Classes (Schedule viewer and booking)
    ├── Trainers (Staff profiles and booking)
    ├── Equipment (Inventory and maintenance logs)
    ├── Attendance (Check-in system and reports)
    └── Memberships (Plan management and renewals)

Backend: Vanilla PHP
├── Database Connectors
└── APIs
    ├── Public
    │   ├── /health
    │   └── /plans (available membership plans)
    └── Authenticated
        ├── /login
        ├── /signup
        ├── /members/{id} (member profiles)
        ├── /classes (scheduling, bookings)
        ├── /trainers (assignments)
        ├── /equipment (maintenance logs)
        ├── /attendance (check-in/out)
        └── /memberships (renewal endpoints)
```

<details>

<summary>Raw Tree Text

</summary>

[Tree Website](https://tree.nathanfriend.com)


```
Frontend: Vite App
  Pages
    Home (Landing page with gym info, featured classes)
    Login/Signup (Member authentication)
    Profile (Member dashboard, personal info)
    Members (Admin member management)
    Classes (Schedule viewer and booking)
    Trainers (Staff profiles and booking)
    Equipment (Inventory and maintenance logs)
    Attendance (Check-in system and reports)
    Memberships (Plan management and renewals)

Backend: Vanilla PHP
  Database Connectors
  APIs
      Public
        /health
        /plans (available membership plans)
      Authenticated
        /login
        /signup
        /members/{id} (member profiles)
        /classes (scheduling, bookings)
        /trainers (assignments)
        /equipment (maintenance logs)
        /attendance (check-in/out)
        /memberships (renewal endpoints)
```

</details>
