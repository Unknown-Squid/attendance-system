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
      fields: ['created_by']
    }
  ]
});

module.exports = AttendanceRoom;

