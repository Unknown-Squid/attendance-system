const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Enrollment = sequelize.define('Enrollment', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false
  },
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
  attendeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'attendee_id',
    references: {
      model: 'attendees',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  },
  enrolledBy: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'enrolled_by',
    references: {
      model: 'users',
      key: 'uuid'
    }
  },
  enrolledAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'enrolled_at'
  }
}, {
  tableName: 'enrollments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (enrollment) => {
      if (!enrollment.uuid) {
        enrollment.uuid = uuidv4();
      }
      if (!enrollment.enrolledAt) {
        enrollment.enrolledAt = new Date();
      }
    }
  },
  indexes: [
    {
      fields: ['room_id']
    },
    {
      fields: ['attendee_id']
    },
    {
      fields: ['enrolled_by']
    },
    {
      fields: ['room_id', 'attendee_id'],
      unique: true,
      name: 'unique_enrollment'
    }
  ]
});

// Define associations
Enrollment.associate = (models) => {
  if (models.AttendanceRoom) {
    Enrollment.belongsTo(models.AttendanceRoom, {
      foreignKey: 'roomId',
      as: 'room'
    });
  }
  
  if (models.Attendee) {
    Enrollment.belongsTo(models.Attendee, {
      foreignKey: 'attendeeId',
      as: 'attendee'
    });
  }
  
  if (models.User) {
    Enrollment.belongsTo(models.User, {
      foreignKey: 'enrolledBy',
      as: 'enrolledByUser'
    });
  }
};

module.exports = Enrollment;
