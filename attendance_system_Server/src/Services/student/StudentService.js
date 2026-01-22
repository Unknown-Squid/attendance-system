const Student = require('../../Model/Student');
const { ApiError } = require('../../Utils/errorHandler');
const { Op } = require('sequelize');

class StudentService {
  /**
   * Create a new student
   */
  async createStudent(studentData) {
    try {
      // Check if student with this student number already exists
      const existing = await Student.findOne({
        where: { studentNumber: studentData.studentNumber }
      });

      if (existing) {
        throw new ApiError('Student with this student number already exists', 409);
      }

      const student = await Student.create(studentData);
      return student;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to create student: ${error.message}`, 500, error);
    }
  }

  /**
   * Get all students with filters
   */
  async getStudents(filters = {}) {
    try {
      const where = {};

      if (filters.course) {
        where.course = filters.course;
      }

      if (filters.yearLevel) {
        where.yearLevel = filters.yearLevel;
      }

      if (filters.section) {
        where.section = filters.section;
      }

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.search) {
        where[Op.or] = [
          { firstName: { [Op.like]: `%${filters.search}%` } },
          { surname: { [Op.like]: `%${filters.search}%` } },
          { studentNumber: { [Op.like]: `%${filters.search}%` } }
        ];
      }

      const students = await Student.findAll({
        where,
        order: [['created_at', 'DESC']]
      });

      return students;
    } catch (error) {
      throw new ApiError(`Failed to get students: ${error.message}`, 500, error);
    }
  }

  /**
   * Get student by UUID
   */
  async getStudentByUuid(uuid) {
    try {
      const student = await Student.findByPk(uuid);
      if (!student) {
        throw new ApiError('Student not found', 404);
      }
      return student;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get student: ${error.message}`, 500, error);
    }
  }

  /**
   * Get student by student number
   */
  async getStudentByStudentNumber(studentNumber) {
    try {
      const student = await Student.findOne({
        where: { studentNumber }
      });
      if (!student) {
        throw new ApiError('Student not found', 404);
      }
      return student;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to get student: ${error.message}`, 500, error);
    }
  }

  /**
   * Update student
   */
  async updateStudent(uuid, updateData) {
    try {
      const student = await Student.findByPk(uuid);
      if (!student) {
        throw new ApiError('Student not found', 404);
      }

      // If student number is being updated, check for duplicates
      if (updateData.studentNumber && updateData.studentNumber !== student.studentNumber) {
        const existing = await Student.findOne({
          where: {
            studentNumber: updateData.studentNumber,
            uuid: { [Op.ne]: uuid }
          }
        });

        if (existing) {
          throw new ApiError('Student with this student number already exists', 409);
        }
      }

      await student.update(updateData);
      return student;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to update student: ${error.message}`, 500, error);
    }
  }

  /**
   * Delete student
   */
  async deleteStudent(uuid) {
    try {
      const student = await Student.findByPk(uuid);
      if (!student) {
        throw new ApiError('Student not found', 404);
      }

      await student.destroy();
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Failed to delete student: ${error.message}`, 500, error);
    }
  }
}

module.exports = new StudentService();
