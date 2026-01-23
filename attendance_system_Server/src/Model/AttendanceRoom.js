const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AttendanceRoom = sequelize.define('AttendanceRoom', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
    field: 'uuid'
  },
  subjectId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'subject_id',
    references: {
      model: 'subjects',
      key: 'uuid'
    }
  },
  teacherId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'teacher_id',
    references: {
      model: 'teachers',
      key: 'uuid'
    }
  },
  enrollmentKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'enrollment_key'
  },
  type: {
    type: DataTypes.ENUM('regular', 'event'),
    allowNull: false,
    field: 'type'
  },
  category: {
    type: DataTypes.ENUM('regular-class', 'workshop', 'examination', 'event', 'archive'),
    allowNull: false,
    field: 'category'
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'semester'
  },
  academicYear: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'academic_year'
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'data'
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'created_by',
    references: {
      model: 'users',
      key: 'uuid'
    }
  }
}, {
  tableName: 'attendance_rooms',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (room) => {
      if (!room.uuid) {
        room.uuid = uuidv4();
      }
    }
  },
  indexes: [
    {
      fields: ['enrollment_key']
    },
    {
      fields: ['category']
    },
    {
      fields: ['type']
    },
    {
      fields: ['subject_id']
    },
    {
      fields: ['teacher_id']
    },
    {
      fields: ['created_by']
    },
    {
      fields: ['semester', 'academic_year']
    }
  ]
});

// Define associations
AttendanceRoom.associate = (models) => {
  if (models.Subject) {
    AttendanceRoom.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject'
    });
  }
  
  if (models.Teacher) {
    AttendanceRoom.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
  }
  
  if (models.User) {
    AttendanceRoom.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  }
  
  if (models.AttendanceRecord) {
    AttendanceRoom.hasMany(models.AttendanceRecord, {
      foreignKey: 'roomId',
      as: 'attendanceRecords'
    });
  }
  
  if (models.Enrollment) {
    AttendanceRoom.hasMany(models.Enrollment, {
      foreignKey: 'roomId',
      as: 'enrollments'
    });
  }
};

module.exports = AttendanceRoom;

