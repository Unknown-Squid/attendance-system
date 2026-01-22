const studentService = require('../../Services/student/StudentService');
const { asyncHandler } = require('../../Utils/errorHandler');

class StudentController {
  /**
   * Create a new student
   */
  createStudent = asyncHandler(async (req, res) => {
    const { surname, firstName, middleName, studentNumber, sex, course, yearLevel, section, status } = req.body;

    if (!surname || !firstName || !studentNumber || !sex || !course || !yearLevel || !section) {
      return res.status(400).json({
        success: false,
        message: 'Surname, first name, student number, sex, course, year level, and section are required'
      });
    }

    const student = await studentService.createStudent({
      surname,
      firstName,
      middleName: middleName || null,
      studentNumber,
      sex,
      course,
      yearLevel: parseInt(yearLevel),
      section,
      status: status || 'active'
    });

    res.status(201).json({
      success: true,
      student,
      message: 'Student created successfully'
    });
  });

  /**
   * Get all students
   */
  getStudents = asyncHandler(async (req, res) => {
    const { course, yearLevel, section, status, search } = req.query;

    const filters = {};
    if (course) filters.course = course;
    if (yearLevel) filters.yearLevel = parseInt(yearLevel);
    if (section) filters.section = section;
    if (status) filters.status = status;
    if (search) filters.search = search;

    const students = await studentService.getStudents(filters);

    res.json({
      success: true,
      students
    });
  });

  /**
   * Get student by UUID
   */
  getStudentByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const student = await studentService.getStudentByUuid(uuid);

    res.json({
      success: true,
      student
    });
  });

  /**
   * Get student by student number
   */
  getStudentByStudentNumber = asyncHandler(async (req, res) => {
    const { studentNumber } = req.params;
    const student = await studentService.getStudentByStudentNumber(studentNumber);

    res.json({
      success: true,
      student
    });
  });

  /**
   * Update student
   */
  updateStudent = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const updateData = req.body;

    // Convert yearLevel to integer if provided
    if (updateData.yearLevel) {
      updateData.yearLevel = parseInt(updateData.yearLevel);
    }

    const student = await studentService.updateStudent(uuid, updateData);

    res.json({
      success: true,
      student,
      message: 'Student updated successfully'
    });
  });

  /**
   * Delete student
   */
  deleteStudent = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await studentService.deleteStudent(uuid);

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  });
}

module.exports = new StudentController();
