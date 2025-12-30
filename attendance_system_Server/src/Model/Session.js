const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Session = sequelize.define('Session', {
  sessionId: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
    field: 'session_id'
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'uuid'
    },
    onDelete: 'CASCADE'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_agent'
  }
}, {
  tableName: 'sessions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['session_id']
    },
    {
      fields: ['expires_at']
    }
  ]
});

// Define associations
Session.associate = (models) => {
  if (models.User) {
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
};

module.exports = Session;

