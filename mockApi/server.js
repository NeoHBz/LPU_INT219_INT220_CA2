const express = require('express');
const fs = require('fs');
const path = require('path');
const { log } = require('util');

const app = express();
const PORT = process.env.PORT || 9876;

// Middleware to serve JSON data
app.use(express.json());

// Route to get dashboard data
app.get('/api/dashboard', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'dashboard.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading dashboard data');
        }
        res.json(JSON.parse(data));
    });
});

// Route to get attendance data
app.get('/api/attendance', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'attendance.json'), 'utf8', (err, data) => {
        // generate a random attendance of current month, each time . 
        // this will be called, to simulate real time data
        
        let attendance;
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let randomAttendance = [];
        for (let i = 1; i <= 30; i++) {
            randomAttendance.push({
                date: `${i}`,
                total: Math.floor(Math.random() * 100) // Random attendance percentage
            });
        }
        attendance = randomAttendance;

        if (err) {
            return res.status(500).send('Error reading attendance data');
        }
        res.json({attendance:attendance});
    });
});

// Route to get upcoming classes data
app.get('/api/upcoming-classes', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'upcoming-classes.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading upcoming classes data');
        }
        res.json(JSON.parse(data));
    });
});

// Route to get recent activities data
app.get('/api/recent-activities', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'recent-activities.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading recent activities data');
        }
        res.json(JSON.parse(data));
    });
});

// Route to get membership stats data
app.get('/api/membership-stats', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'membership-stats.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading membership stats data');
        }
        res.json(JSON.parse(data));
    });
});
app.get("/api/me", (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'userInformation.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading user information data');
        }
        res.json(JSON.parse(data));
    }
    );
})

// Start the server
app.listen(PORT, () => {
    console.log(`Mock API server is running on http://localhost:${PORT}`);
});