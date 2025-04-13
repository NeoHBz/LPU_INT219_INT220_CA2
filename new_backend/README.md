# PHP Backend Framework for Fitness Application

A modern, lightweight PHP backend framework implementing RESTful API principles with a modular architecture. This framework serves as the backend for a fitness application with user authentication and profile management.

## Features

- Pure PHP implementation with MySQL database connectivity
- Environment variable configuration management
- RESTful API endpoints with standard HTTP methods
- Secure user authentication with JWT tokens
- Modular architecture (controllers, models, routes)
- Modern PHP practices including namespaces and autoloading
- Robust error handling and response formatting

## Project Structure

```
/
├── auth/               # Authentication utilities
├── config/             # Configuration files
├── controllers/        # Controller classes
├── database/           # Database connection and schema
├── middleware/         # Request middleware
├── models/             # Data models
├── routes/             # API route definitions
├── .env.example        # Environment configuration template
└── index.php           # Application entry point
```

## Authentication

The API uses JWT token-based authentication. Protected routes require an `Authorization` header with a Bearer token:

```
Authorization: Bearer your_jwt_token
```
