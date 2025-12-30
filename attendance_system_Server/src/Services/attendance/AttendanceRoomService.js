const AttendanceRoom = require('../../Model/AttendanceRoom');

class AttendanceRoomService {
  /**
   * Get all attendance rooms
   * @param {Object} filters - Optional filters (category, type, createdBy)
   * @returns {Promise<Array>} List of attendance rooms
   */
  async getAllRooms(filters = {}) {
    const where = {};
    
    if (filters.category) {
      where.category = filters.category;
    }
    
    if (filters.type) {
      where.type = filters.type;
    }
    
    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }

    const rooms = await AttendanceRoom.findAll({
      where,
      order: [['created_at', 'DESC']]
    });

    return rooms.map(room => room.toJSON());
  }

  /**
   * Get room by UUID
   * @param {string} uuid - Room UUID
   * @returns {Promise<Object>} Room data
   */
  async getRoomByUuid(uuid) {
    const room = await AttendanceRoom.findByPk(uuid);

    if (!room) {
      throw new Error('Attendance room not found');
    }

    return room.toJSON();
  }

  /**
   * Get room by enrollment key
   * @param {string} enrollmentKey - Enrollment key
   * @returns {Promise<Object>} Room data
   */
  async getRoomByEnrollmentKey(enrollmentKey) {
    const room = await AttendanceRoom.findOne({
      where: { enrollmentKey }
    });

    if (!room) {
      throw new Error('Attendance room not found');
    }

    return room.toJSON();
  }

  /**
   * Create a new attendance room
   * @param {Object} roomData - Room data
   * @returns {Promise<Object>} Created room
   */
  async createRoom(roomData) {
    const { enrollmentKey, type, category, data, createdBy } = roomData;

    // Check if enrollment key already exists
    const existingRoom = await AttendanceRoom.findOne({ where: { enrollmentKey } });
    if (existingRoom) {
      throw new Error('Room with this enrollment key already exists');
    }

    // Create room
    const room = await AttendanceRoom.create({
      enrollmentKey,
      type,
      category,
      data,
      createdBy
    });

    return room.toJSON();
  }

  /**
   * Update attendance room
   * @param {string} uuid - Room UUID
   * @param {Object} roomData - Updated room data
   * @returns {Promise<Object>} Updated room
   */
  async updateRoom(uuid, roomData) {
    const room = await AttendanceRoom.findByPk(uuid);
    if (!room) {
      throw new Error('Attendance room not found');
    }

    const { enrollmentKey, type, category, data } = roomData;

    // Check if enrollment key is being changed and if it's already taken
    if (enrollmentKey && enrollmentKey !== room.enrollmentKey) {
      const existingRoom = await AttendanceRoom.findOne({ where: { enrollmentKey } });
      if (existingRoom) {
        throw new Error('Room with this enrollment key already exists');
      }
      room.enrollmentKey = enrollmentKey;
    }

    if (type) room.type = type;
    if (category) room.category = category;
    if (data) room.data = data;

    await room.save();

    return room.toJSON();
  }

  /**
   * Delete attendance room
   * @param {string} uuid - Room UUID
   * @returns {Promise<boolean>} Success status
   */
  async deleteRoom(uuid) {
    const room = await AttendanceRoom.findByPk(uuid);
    if (!room) {
      throw new Error('Attendance room not found');
    }

    await room.destroy();
    return true;
  }

  /**
   * Archive attendance room (change category to archive)
   * @param {string} uuid - Room UUID
   * @returns {Promise<Object>} Updated room
   */
  async archiveRoom(uuid) {
    const room = await AttendanceRoom.findByPk(uuid);
    if (!room) {
      throw new Error('Attendance room not found');
    }

    room.category = 'archive';
    await room.save();

    return room.toJSON();
  }
}

module.exports = new AttendanceRoomService();

