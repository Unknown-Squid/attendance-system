const Subject = require('../../Model/Subject');
const { ApiError } = require('../../Utils/errorHandler');
const { Op } = require('sequelize');

class SubjectService {
  /**
   * Create a new subject
   */
  async createSubject(subjectData) {
    try {
      if (!subjectData.code || !subjectData.name) {
        throw new ApiError('Subject code and name are required', 400);
      }

      const subject = await Subject.create({
        ...subjectData,
        status: subjectData.status || 'active'
      });

      return subject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to create subject: ${error.message}`, 500, error);
    }
  }

  /**
   * Get all subjects with filters
   */
  async getSubjects(filters = {}) {
    try {
      const where = {};

      if (filters.department) {
        where.department = filters.department;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.search) {
        where[Op.or] = [
          { code: { [Op.like]: `%${filters.search}%` } },
          { name: { [Op.like]: `%${filters.search}%` } }
        ];
      }

      const subjects = await Subject.findAll({
        where,
        order: [['code', 'ASC']]
      });

      return subjects;
    } catch (error) {
      throw new ApiError(`Failed to get subjects: ${error.message}`, 500, error);
    }
  }

  /**
   * Get subject by UUID
   */
  async getSubjectByUuid(uuid) {
    try {
      const subject = await Subject.findByPk(uuid);

      if (!subject) {
        throw new ApiError('Subject not found', 404);
      }

      return subject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get subject: ${error.message}`, 500, error);
    }
  }

  /**
   * Get subject by code
   */
  async getSubjectByCode(code) {
    try {
      const subject = await Subject.findOne({ where: { code } });

      if (!subject) {
        throw new ApiError('Subject not found', 404);
      }

      return subject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get subject: ${error.message}`, 500, error);
    }
  }

  /**
   * Update subject
   */
  async updateSubject(uuid, updateData) {
    try {
      const subject = await Subject.findByPk(uuid);

      if (!subject) {
        throw new ApiError('Subject not found', 404);
      }

      await subject.update(updateData);
      await subject.reload();

      return subject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to update subject: ${error.message}`, 500, error);
    }
  }

  /**
   * Delete subject
   */
  async deleteSubject(uuid) {
    try {
      const subject = await Subject.findByPk(uuid);

      if (!subject) {
        throw new ApiError('Subject not found', 404);
      }

      await subject.destroy();

      return { success: true };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to delete subject: ${error.message}`, 500, error);
    }
  }
}

module.exports = new SubjectService();
