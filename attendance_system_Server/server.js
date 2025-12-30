const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { sequelize, testConnection } = require('./config/database');
const User = require('./src/Model/User');
const Session = require('./src/Model/Session');
const AttendanceRoom = require('./src/Model/AttendanceRoom');
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
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance-rooms', attendanceRoomRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
