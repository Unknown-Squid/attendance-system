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
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'last_name'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'phone'
  },
  role: {
    type: DataTypes.ENUM('admin', 'teacher'),
    allowNull: false,
    defaultValue: 'teacher'
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
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'department'
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
  
  if (models.Teacher) {
    User.hasOne(models.Teacher, {
      foreignKey: 'userId',
      as: 'teacher'
    });
  }
  
  if (models.Attendee) {
    User.hasOne(models.Attendee, {
      foreignKey: 'userId',
      as: 'attendee'
    });
  }
  
  if (models.AttendanceRoom) {
    User.hasMany(models.AttendanceRoom, {
      foreignKey: 'createdBy',
      as: 'createdRooms'
    });
  }
  
  if (models.AttendanceRecord) {
    User.hasMany(models.AttendanceRecord, {
      foreignKey: 'markedBy',
      as: 'markedRecords'
    });
  }
};

module.exports = User;

