const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const SubjectTeacher = sequelize.define('SubjectTeacher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  subjectId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'subject_id',
    references: {
      model: 'subjects',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  },
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'teacher_id',
    references: {
      model: 'teachers',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
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
  }
}, {
  tableName: 'subject_teachers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['subject_id']
    },
    {
      fields: ['teacher_id']
    },
    {
      fields: ['subject_id', 'teacher_id'],
      unique: true,
      name: 'unique_subject_teacher'
    },
    {
      fields: ['semester', 'academic_year']
    }
  ]
});

// Define associations
SubjectTeacher.associate = (models) => {
  if (models.Subject) {
    SubjectTeacher.belongsTo(models.Subject, {
      foreignKey: 'subjectId',
      as: 'subject'
    });
  }
  
  if (models.Teacher) {
    SubjectTeacher.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher'
    });
  }
};

module.exports = SubjectTeacher;
