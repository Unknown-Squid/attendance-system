const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AttendanceRecord = sequelize.define('AttendanceRecord', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'date'
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'time'
  },
  status: {
    type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
    allowNull: false,
    defaultValue: 'present',
    field: 'status'
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'qr_code'
  },
  signature: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'signature' // Base64 image data
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'notes'
  },
  markedBy: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'marked_by',
    references: {
      model: 'users',
      key: 'uuid'
    }
  }
}, {
  tableName: 'attendance_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (record) => {
      if (!record.uuid) {
        record.uuid = uuidv4();
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
      fields: ['date']
    },
    {
      fields: ['status']
    },
    {
      fields: ['room_id', 'attendee_id', 'date'],
      unique: true,
      name: 'unique_attendance_per_day'
    },
    {
      fields: ['marked_by']
    }
  ]
});

// Define associations
AttendanceRecord.associate = (models) => {
  if (models.AttendanceRoom) {
    AttendanceRecord.belongsTo(models.AttendanceRoom, {
      foreignKey: 'roomId',
      as: 'room'
    });
  }
  
  if (models.Attendee) {
    AttendanceRecord.belongsTo(models.Attendee, {
      foreignKey: 'attendeeId',
      as: 'attendee'
    });
  }
  
  if (models.User) {
    AttendanceRecord.belongsTo(models.User, {
      foreignKey: 'markedBy',
      as: 'markedByUser'
    });
  }
};

module.exports = AttendanceRecord;
