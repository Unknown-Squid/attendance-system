const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Subject = sequelize.define('Subject', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'code'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description'
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'credits',
    validate: {
      min: 0,
      max: 10
    }
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'department'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    allowNull: false,
    defaultValue: 'active',
    field: 'status'
  }
}, {
  tableName: 'subjects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (subject) => {
      if (!subject.uuid) {
        subject.uuid = uuidv4();
      }
    }
  },
  indexes: [
    {
      fields: ['code'],
      unique: true
    },
    {
      fields: ['department']
    },
    {
      fields: ['status']
    }
  ]
});

// Define associations
Subject.associate = (models) => {
  if (models.AttendanceRoom) {
    Subject.hasMany(models.AttendanceRoom, {
      foreignKey: 'subjectId',
      as: 'attendanceRooms'
    });
  }
  
  if (models.SubjectTeacher) {
    Subject.hasMany(models.SubjectTeacher, {
      foreignKey: 'subjectId',
      as: 'subjectTeachers'
    });
  }
};

module.exports = Subject;
