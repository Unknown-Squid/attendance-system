const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');
const User = require('../src/Model/User');

async function createTestUser() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Sync models
    await sequelize.sync({ alter: false });
    console.log('Models synchronized.');

    // Test user data
    const testUsers = [
      {
        firstName: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        firstName: 'Teacher',
        email: 'teacher@test.com',
        password: 'teacher123',
        role: 'teacher'
      },
      {
        firstName: 'Student',
        email: 'student@test.com',
        password: 'student123',
        role: 'student'
      }
    ];

    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email: userData.email } });
      
      if (existingUser) {
        console.log(`User ${userData.email} already exists. Skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user
      const user = await User.create({
        firstName: userData.firstName,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });

      console.log(`✓ Created test user: ${userData.email} (${userData.role})`);
      console.log(`  Password: ${userData.password}`);
    }

    console.log('\nTest users created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin:   admin@test.com / admin123');
    console.log('Teacher: teacher@test.com / teacher123');
    console.log('Student: student@test.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();

