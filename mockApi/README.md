# Mock API for Dashboard Data

This project provides a mock API for a fitness dashboard application. It serves various mock data related to members, attendance, classes, activities, and membership statistics.

## Project Structure

```
mock-api
├── data
│   ├── dashboard.json          # Mock data for the dashboard
│   ├── attendance.json         # Mock data for attendance statistics
│   ├── upcoming-classes.json   # Mock data for upcoming classes
│   ├── recent-activities.json   # Mock data for recent activities
│   └── membership-stats.json   # Mock data for membership statistics
├── server.js                   # Express server to serve the mock data
└── README.md                   # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mock-api
   ```

2. Install the dependencies:
   ```
   npm install express
   ```

### Running the Server

To start the server, run the following command:

```
node server.js
```

The server will start on `http://localhost:3000`.

### Accessing the Mock API

You can access the mock data through the following endpoints:

- **Dashboard Data**: `GET /api/dashboard`
- **Attendance Data**: `GET /api/attendance`
- **Upcoming Classes**: `GET /api/upcoming-classes`
- **Recent Activities**: `GET /api/recent-activities`
- **Membership Statistics**: `GET /api/membership-stats`

### Example Usage

You can use tools like Postman or your browser to access the endpoints. For example, to get the dashboard data, navigate to:

```
http://localhost:3000/api/dashboard
```

## License

This project is licensed under the MIT License.