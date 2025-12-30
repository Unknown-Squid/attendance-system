const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher', 'student', 'staff'),
    allowNull: false,
    defaultValue: 'student'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255] // Minimum 6 characters
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (user) => {
      if (!user.uuid) {
        user.uuid = uuidv4();
      }
    }
  }
});

// Define associations
User.associate = (models) => {
  if (models.Session) {
    User.hasMany(models.Session, {
      foreignKey: 'userId',
      as: 'sessions'
    });
  }
};

module.exports = User;

