const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Teacher = sequelize.define('Teacher', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'employee_id'
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'department'
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'specialization'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'on_leave'),
    allowNull: false,
    defaultValue: 'active',
    field: 'status'
  }
}, {
  tableName: 'teachers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (teacher) => {
      if (!teacher.uuid) {
        teacher.uuid = uuidv4();
      }
    }
  },
  indexes: [
    {
      fields: ['user_id'],
      unique: true
    },
    {
      fields: ['employee_id'],
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
Teacher.associate = (models) => {
  if (models.User) {
    Teacher.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
  
  if (models.AttendanceRoom) {
    Teacher.hasMany(models.AttendanceRoom, {
      foreignKey: 'teacherId',
      as: 'attendanceRooms'
    });
  }
  
  if (models.SubjectTeacher) {
    Teacher.hasMany(models.SubjectTeacher, {
      foreignKey: 'teacherId',
      as: 'subjectTeachers'
    });
  }
};

module.exports = Teacher;
