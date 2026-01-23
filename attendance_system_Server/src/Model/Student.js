const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Student = sequelize.define('Student', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'surname'
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'middle_name'
  },
  studentNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'student_number'
  },
  sex: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
    field: 'sex'
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'course'
  },
  yearLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'year_level',
    validate: {
      min: 1,
      max: 10
    }
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'section'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'graduated', 'dropped'),
    allowNull: false,
    defaultValue: 'active',
    field: 'status'
  }
}, {
  tableName: 'students',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (student) => {
      if (!student.uuid) {
        student.uuid = uuidv4();
      }
    }
  },
  indexes: [
    {
      fields: ['student_number'],
      unique: true
    },
    {
      fields: ['course']
    },
    {
      fields: ['year_level']
    },
    {
      fields: ['section']
    },
    {
      fields: ['status']
    }
  ]
});

Student.associate = (models) => {
  if (models.Attendee) {
    Student.hasMany(models.Attendee, {
      foreignKey: 'studentId',
      as: 'attendees'
    });
  }
};

module.exports = Student;
