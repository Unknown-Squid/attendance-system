const subjectService = require('../../Services/subject/SubjectService');
const { asyncHandler } = require('../../Utils/errorHandler');

class SubjectController {
  /**
   * Create subject
   */
  createSubject = asyncHandler(async (req, res) => {
    const subject = await subjectService.createSubject(req.body);
    
    res.status(201).json({
      success: true,
      subject,
      message: 'Subject created successfully'
    });
  });

  /**
   * Get all subjects
   */
  getAllSubjects = asyncHandler(async (req, res) => {
    const { department, status, search } = req.query;
    
    const filters = {};
    if (department) filters.department = department;
    if (status) filters.status = status;
    if (search) filters.search = search;
    
    const subjects = await subjectService.getSubjects(filters);
    
    res.json({
      success: true,
      subjects
    });
  });

  /**
   * Get subject by UUID
   */
  getSubjectByUuid = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const subject = await subjectService.getSubjectByUuid(uuid);
    
    res.json({
      success: true,
      subject
    });
  });

  /**
   * Get subject by code
   */
  getSubjectByCode = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const subject = await subjectService.getSubjectByCode(code);
    
    res.json({
      success: true,
      subject
    });
  });

  /**
   * Update subject
   */
  updateSubject = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    const subject = await subjectService.updateSubject(uuid, req.body);
    
    res.json({
      success: true,
      subject,
      message: 'Subject updated successfully'
    });
  });

  /**
   * Delete subject
   */
  deleteSubject = asyncHandler(async (req, res) => {
    const { uuid } = req.params;
    await subjectService.deleteSubject(uuid);
    
    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  });
}

module.exports = new SubjectController();
