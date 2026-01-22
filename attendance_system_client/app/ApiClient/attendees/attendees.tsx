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
}

export interface Attendee {
  uuid: string;
  studentId?: string;
  roomId: string;
  name: string;
  studentNumber?: string;
  email?: string;
  sex?: 'male' | 'female' | 'other';
  type: 'student' | 'teacher';
  userId?: string;
  status: 'active' | 'inactive' | 'graduated' | 'dropped';
  createdAt?: string;
  updatedAt?: string;
  student?: Student;
}

export interface CreateAttendeeData {
  roomId: string;
  studentId?: string;
  name?: string;
  studentNumber?: string;
  email?: string;
  sex?: 'male' | 'female' | 'other';
  type?: 'student' | 'teacher';
  userId?: string;
  status?: 'active' | 'inactive' | 'graduated' | 'dropped';
}

export interface UpdateAttendeeData {
  name?: string;
  studentNumber?: string;
  email?: string;
  sex?: 'male' | 'female' | 'other';
  status?: 'active' | 'inactive' | 'graduated' | 'dropped';
}

export interface GetAttendeesResponse {
  success: boolean;
  attendees: Attendee[];
  message?: string;
}

export interface AttendeeResponse {
  success: boolean;
  attendee: Attendee;
  message?: string;
}

export interface BulkCreateAttendeesResponse {
  success: boolean;
  attendees: Attendee[];
  message?: string;
}

/**
 * Get all attendees
 */
export const getAttendees = async (filters?: {
  type?: 'student' | 'teacher';
  course?: string;
  status?: string;
  search?: string;
}): Promise<GetAttendeesResponse> => {
  const params = new URLSearchParams();
  if (filters?.type) params.append('type', filters.type);
  if (filters?.course) params.append('course', filters.course);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/attendees${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetAttendeesResponse>(
    () => apiClient.request<GetAttendeesResponse['attendees']>(url, { method: 'GET' }),
    'Failed to fetch attendees'
  );
};

/**
 * Get attendee by UUID
 */
export const getAttendeeByUuid = async (uuid: string): Promise<AttendeeResponse> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<AttendeeResponse>(
    () => apiClient.request<AttendeeResponse['attendee']>(`/attendees/${uuid}`, { method: 'GET' }),
    `Failed to fetch attendee with UUID: ${uuid}`
  );
};

/**
 * Get attendee by student number
 */
export const getAttendeeByStudentNumber = async (studentNumber: string): Promise<AttendeeResponse> => {
  validateRequired(studentNumber, 'Student number');
  
  return handleApiRequest<AttendeeResponse>(
    () => apiClient.request<AttendeeResponse['attendee']>(`/attendees/student-number/${studentNumber}`, { method: 'GET' }),
    `Failed to fetch attendee with student number: ${studentNumber}`
  );
};

/**
 * Create a new attendee
 */
export const createAttendee = async (attendeeData: CreateAttendeeData): Promise<AttendeeResponse> => {
  validateRequired(attendeeData.roomId, 'Room ID');
  // Name is required if studentId is not provided
  if (!attendeeData.studentId && !attendeeData.name) {
    throw new Error('Name is required when student ID is not provided');
  }
  
  return handleApiRequest<AttendeeResponse>(
    () => apiClient.request<AttendeeResponse['attendee']>('/attendees', {
      method: 'POST',
      body: JSON.stringify(attendeeData),
    }),
    'Failed to create attendee'
  );
};

/**
 * Update attendee
 */
export const updateAttendee = async (uuid: string, attendeeData: UpdateAttendeeData): Promise<AttendeeResponse> => {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(attendeeData, 'Update data is required');
  
  return handleApiRequest<AttendeeResponse>(
    () => apiClient.request<AttendeeResponse['attendee']>(`/attendees/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(attendeeData),
    }),
    `Failed to update attendee with UUID: ${uuid}`
  );
};

/**
 * Delete attendee
 */
export const deleteAttendee = async (uuid: string): Promise<{ success: boolean; message?: string }> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<{ success: boolean; message?: string }>(
    () => apiClient.request(`/attendees/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete attendee with UUID: ${uuid}`
  );
};

/**
 * Bulk create attendees
 */
export const bulkCreateAttendees = async (attendees: CreateAttendeeData[]): Promise<BulkCreateAttendeesResponse> => {
  if (!Array.isArray(attendees) || attendees.length === 0) {
    throw new Error('Attendees array is required and must not be empty');
  }
  
  return handleApiRequest<BulkCreateAttendeesResponse>(
    () => apiClient.request<BulkCreateAttendeesResponse['attendees']>('/attendees/bulk', {
      method: 'POST',
      body: JSON.stringify({ attendees }),
    }),
    'Failed to bulk create attendees'
  );
};

/**
 * Get attendees by course
 */
export const getAttendeesByCourse = async (course: string): Promise<GetAttendeesResponse> => {
  validateRequired(course, 'Course');
  
  return handleApiRequest<GetAttendeesResponse>(
    () => apiClient.request<GetAttendeesResponse['attendees']>(`/attendees/course/${encodeURIComponent(course)}`, { method: 'GET' }),
    `Failed to fetch attendees for course: ${course}`
  );
};

/**
 * Get attendees by room
 */
export const getAttendeesByRoom = async (roomId: string): Promise<GetAttendeesResponse> => {
  validateRequired(roomId, 'Room ID');
  
  return handleApiRequest<GetAttendeesResponse>(
    () => apiClient.request<GetAttendeesResponse['attendees']>(`/attendees/room/${roomId}`, { method: 'GET' }),
    `Failed to fetch attendees for room: ${roomId}`
  );
};
