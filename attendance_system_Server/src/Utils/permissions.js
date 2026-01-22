// Permission definitions for RBAC system

/**
 * Permission structure:
 * resource:action
 * 
 * Examples:
 * - attendees:create
 * - attendance-rooms:read
 * - enrollments:delete
 */

const PERMISSIONS = {
  // Attendee permissions
  ATTENDEES_CREATE: 'attendees:create',
  ATTENDEES_READ: 'attendees:read',
  ATTENDEES_UPDATE: 'attendees:update',
  ATTENDEES_DELETE: 'attendees:delete',
  ATTENDEES_BULK_CREATE: 'attendees:bulk-create',
  
  // Attendance Room permissions
  ROOMS_CREATE: 'attendance-rooms:create',
  ROOMS_READ: 'attendance-rooms:read',
  ROOMS_UPDATE: 'attendance-rooms:update',
  ROOMS_DELETE: 'attendance-rooms:delete',
  ROOMS_ARCHIVE: 'attendance-rooms:archive',
  
  // Enrollment permissions
  ENROLLMENTS_CREATE: 'enrollments:create',
  ENROLLMENTS_READ: 'enrollments:read',
  ENROLLMENTS_DELETE: 'enrollments:delete',
  ENROLLMENTS_BULK_CREATE: 'enrollments:bulk-create',
  
  // Attendance Record permissions
  RECORDS_CREATE: 'attendance-records:create',
  RECORDS_READ: 'attendance-records:read',
  RECORDS_UPDATE: 'attendance-records:update',
  RECORDS_DELETE: 'attendance-records:delete',
  
  // Subject permissions
  SUBJECTS_CREATE: 'subjects:create',
  SUBJECTS_READ: 'subjects:read',
  SUBJECTS_UPDATE: 'subjects:update',
  SUBJECTS_DELETE: 'subjects:delete',
  
  // User permissions
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
  
  // Student permissions
  STUDENTS_CREATE: 'students:create',
  STUDENTS_READ: 'students:read',
  STUDENTS_UPDATE: 'students:update',
  STUDENTS_DELETE: 'students:delete',
  MANAGE_STUDENTS: 'manage_students',
  VIEW_STUDENTS: 'view_students',
};

/**
 * Role-based permission mapping
 * Defines what permissions each role has
 */
const ROLE_PERMISSIONS = {
  admin: [
    // Full access to everything
    PERMISSIONS.ATTENDEES_CREATE,
    PERMISSIONS.ATTENDEES_READ,
    PERMISSIONS.ATTENDEES_UPDATE,
    PERMISSIONS.ATTENDEES_DELETE,
    PERMISSIONS.ATTENDEES_BULK_CREATE,
    
    PERMISSIONS.ROOMS_CREATE,
    PERMISSIONS.ROOMS_READ,
    PERMISSIONS.ROOMS_UPDATE,
    PERMISSIONS.ROOMS_DELETE,
    PERMISSIONS.ROOMS_ARCHIVE,
    
    PERMISSIONS.ENROLLMENTS_CREATE,
    PERMISSIONS.ENROLLMENTS_READ,
    PERMISSIONS.ENROLLMENTS_DELETE,
    PERMISSIONS.ENROLLMENTS_BULK_CREATE,
    
    PERMISSIONS.RECORDS_CREATE,
    PERMISSIONS.RECORDS_READ,
    PERMISSIONS.RECORDS_UPDATE,
    PERMISSIONS.RECORDS_DELETE,
    
    PERMISSIONS.SUBJECTS_CREATE,
    PERMISSIONS.SUBJECTS_READ,
    PERMISSIONS.SUBJECTS_UPDATE,
    PERMISSIONS.SUBJECTS_DELETE,
    
    PERMISSIONS.USERS_CREATE,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.USERS_UPDATE,
    PERMISSIONS.USERS_DELETE,
    
    PERMISSIONS.STUDENTS_CREATE,
    PERMISSIONS.STUDENTS_READ,
    PERMISSIONS.STUDENTS_UPDATE,
    PERMISSIONS.STUDENTS_DELETE,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.VIEW_STUDENTS,
  ],
  
  teacher: [
    // Can manage students and their own rooms
    PERMISSIONS.ATTENDEES_CREATE, // Register students
    PERMISSIONS.ATTENDEES_READ,
    PERMISSIONS.ATTENDEES_UPDATE,
    PERMISSIONS.ATTENDEES_BULK_CREATE, // Bulk add by course
    
    PERMISSIONS.ROOMS_CREATE, // Create rooms for students
    PERMISSIONS.ROOMS_READ,
    PERMISSIONS.ROOMS_UPDATE, // Only own rooms
    PERMISSIONS.ROOMS_DELETE, // Only own rooms
    
    PERMISSIONS.ENROLLMENTS_CREATE, // Enroll students
    PERMISSIONS.ENROLLMENTS_READ,
    PERMISSIONS.ENROLLMENTS_DELETE,
    PERMISSIONS.ENROLLMENTS_BULK_CREATE,
    
    PERMISSIONS.RECORDS_CREATE, // Mark attendance
    PERMISSIONS.RECORDS_READ,
    PERMISSIONS.RECORDS_UPDATE,
    PERMISSIONS.RECORDS_DELETE, // Delete attendance records
    
    PERMISSIONS.SUBJECTS_READ, // Can view subjects
  ],
};

/**
 * Check if a role has a specific permission
 */
const hasPermission = (role, permission) => {
  if (!role || !ROLE_PERMISSIONS[role]) {
    return false;
  }
  
  return ROLE_PERMISSIONS[role].includes(permission);
};

/**
 * Check if user has any of the required permissions
 */
const hasAnyPermission = (role, permissions) => {
  if (!role || !ROLE_PERMISSIONS[role]) {
    return false;
  }
  
  return permissions.some(permission => 
    ROLE_PERMISSIONS[role].includes(permission)
  );
};

/**
 * Check if user has all required permissions
 */
const hasAllPermissions = (role, permissions) => {
  if (!role || !ROLE_PERMISSIONS[role]) {
    return false;
  }
  
  return permissions.every(permission => 
    ROLE_PERMISSIONS[role].includes(permission)
  );
};

/**
 * Get all permissions for a role
 */
const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getRolePermissions,
};
