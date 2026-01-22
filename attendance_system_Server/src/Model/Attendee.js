const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Attendee = sequelize.define('Attendee', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  // Reference to Student (if attendee is a student)
  studentId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'student_id',
    references: {
      model: 'students',
      key: 'uuid'
    },
    onDelete: 'SET NULL'
  },
  // Reference to AttendanceRoom (which room this attendee is enrolled in)
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'room_id',
    references: {
      model: 'attendance_rooms',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  },
  studentNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'student_number'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email',
    validate: {
      isEmail: true
    }
  },
  sex: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
    field: 'sex'
  },
  type: {
    type: DataTypes.ENUM('student', 'teacher'),
    allowNull: false,
    defaultValue: 'student',
    field: 'type'
  },
  // If type is 'teacher', this links to User (teacher)
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'uuid'
    },
    onDelete: 'SET NULL'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'graduated', 'dropped'),
    allowNull: false,
    defaultValue: 'active',
    field: 'status'
  }
}, {
  tableName: 'attendees',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (attendee) => {
      if (!attendee.uuid) {
        attendee.uuid = uuidv4();
      }
    }
  },
  indexes: [
    {
      fields: ['student_id']
    },
    {
      fields: ['room_id']
    },
    {
      unique: true,
      fields: ['room_id', 'student_id'],
      name: 'unique_room_student'
    },
    {
      fields: ['type']
    },
    {
      fields: ['status']
    },
    {
      fields: ['user_id']
    }
  ]
});

// Define associations
Attendee.associate = (models) => {
  if (models.Student) {
    Attendee.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'student',
      constraints: false
    });
  }
  
  if (models.AttendanceRoom) {
    Attendee.belongsTo(models.AttendanceRoom, {
      foreignKey: 'roomId',
      as: 'room',
      constraints: false
    });
  }
  
  if (models.User) {
    Attendee.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      constraints: false // Allow null for student attendees
    });
  }
  
  if (models.AttendanceRecord) {
    Attendee.hasMany(models.AttendanceRecord, {
      foreignKey: 'attendeeId',
      as: 'attendanceRecords'
    });
  }
};

module.exports = Attendee;
