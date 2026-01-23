const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { sequelize, testConnection } = require('./config/database');
// Import all models
const models = require('./src/Model');
const User = models.User;
const Session = models.Session;
const AttendanceRoom = models.AttendanceRoom;
const Teacher = models.Teacher;
const Subject = models.Subject;
const SubjectTeacher = models.SubjectTeacher;
const Attendee = models.Attendee;
const Enrollment = models.Enrollment;
const AttendanceRecord = models.AttendanceRecord;
const authRoutes = require('./src/Routes/auth/authRoutes');
const userRoutes = require('./src/Routes/user/userRoutes');
const attendanceRoomRoutes = require('./src/Routes/attendance/attendanceRoomRoutes');

// Initialize database: test connection and sync models
const initializeDatabase = async () => {
  try {
    await testConnection();
    // Sync all models to database (creates tables if they don't exist)
    await sequelize.sync({ alter: false }); // Set alter: true to update existing tables
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Initialize database before starting server
initializeDatabase();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance-rooms', attendanceRoomRoutes);
app.use('/api/attendees', require('./src/Routes/attendee/attendeeRoutes'));
app.use('/api/enrollments', require('./src/Routes/enrollment/enrollmentRoutes'));
app.use('/api/attendance-records', require('./src/Routes/attendanceRecord/attendanceRecordRoutes'));
app.use('/api/subjects', require('./src/Routes/subject/subjectRoutes'));
app.use('/api/dashboard', require('./src/Routes/dashboard/dashboardRoutes'));
app.use('/api/students', require('./src/Routes/student/studentRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler middleware (must be last)
const { errorHandler } = require('./src/Utils/errorHandler');
app.use(errorHandler);


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
