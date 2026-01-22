import apiClient from '../apiClient';
import { handleApiRequest, validateRequired, validateNotEmpty } from '@/app/Utils/errorHandler';

export interface Student {
  uuid: string;
  surname: string;
  firstName: string;
  middleName?: string;
  studentNumber: string;
  sex: 'male' | 'female' | 'other';
  course: string;
  yearLevel: number;
  section: string;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentData {
  surname: string;
  firstName: string;
  middleName?: string;
  studentNumber: string;
  sex: 'male' | 'female' | 'other';
  course: string;
  yearLevel: number;
  section: string;
  status?: 'active' | 'inactive' | 'graduated' | 'dropped';
}

export interface UpdateStudentData {
  surname?: string;
  firstName?: string;
  middleName?: string;
  studentNumber?: string;
  sex?: 'male' | 'female' | 'other';
  course?: string;
  yearLevel?: number;
  section?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'dropped';
}

export interface GetStudentsResponse {
  success: boolean;
  students: Student[];
  message?: string;
}

export interface StudentResponse {
  success: boolean;
  student: Student;
  message?: string;
}

/**
 * Create a new student
 */
export const createStudent = async (studentData: CreateStudentData): Promise<StudentResponse> => {
  validateRequired(studentData.surname, 'Surname');
  validateRequired(studentData.firstName, 'First name');
  validateRequired(studentData.studentNumber, 'Student number');
  validateRequired(studentData.sex, 'Sex');
  validateRequired(studentData.course, 'Course');
  validateRequired(studentData.yearLevel, 'Year level');
  validateRequired(studentData.section, 'Section');
  
  return handleApiRequest<StudentResponse>(
    () => apiClient.request<StudentResponse['student']>('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),
    'Failed to create student'
  );
};

/**
 * Get all students
 */
export const getStudents = async (filters?: {
  course?: string;
  yearLevel?: number;
  section?: string;
  status?: string;
  search?: string;
}): Promise<GetStudentsResponse> => {
  const params = new URLSearchParams();
  if (filters?.course) params.append('course', filters.course);
  if (filters?.yearLevel) params.append('yearLevel', filters.yearLevel.toString());
  if (filters?.section) params.append('section', filters.section);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/students${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetStudentsResponse>(
    () => apiClient.request<GetStudentsResponse['students']>(url, { method: 'GET' }),
    'Failed to fetch students'
  );
};

/**
 * Get student by UUID
 */
export const getStudentByUuid = async (uuid: string): Promise<StudentResponse> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<StudentResponse>(
    () => apiClient.request<StudentResponse['student']>(`/students/${uuid}`, { method: 'GET' }),
    `Failed to fetch student with UUID: ${uuid}`
  );
};

/**
 * Get student by student number
 */
export const getStudentByStudentNumber = async (studentNumber: string): Promise<StudentResponse> => {
  validateRequired(studentNumber, 'Student number');
  
  return handleApiRequest<StudentResponse>(
    () => apiClient.request<StudentResponse['student']>(`/students/student-number/${studentNumber}`, { method: 'GET' }),
    `Failed to fetch student with student number: ${studentNumber}`
  );
};

/**
 * Update student
 */
export const updateStudent = async (uuid: string, studentData: UpdateStudentData): Promise<StudentResponse> => {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(studentData, 'Update data is required');
  
  return handleApiRequest<StudentResponse>(
    () => apiClient.request<StudentResponse['student']>(`/students/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    }),
    `Failed to update student with UUID: ${uuid}`
  );
};

/**
 * Delete student
 */
export const deleteStudent = async (uuid: string): Promise<{ success: boolean; message?: string }> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<{ success: boolean; message?: string }>(
    () => apiClient.request(`/students/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete student with UUID: ${uuid}`
  );
};
