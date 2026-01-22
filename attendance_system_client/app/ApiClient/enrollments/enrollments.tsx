import apiClient from '../apiClient';
import { handleApiRequest, validateRequired } from '@/app/Utils/errorHandler';

export interface Enrollment {
  uuid: string;
  roomId: string;
  attendeeId: string;
  enrolledBy?: string;
  enrolledAt: string;
  createdAt?: string;
  updatedAt?: string;
  room?: any;
  attendee?: any;
}

export interface CreateEnrollmentData {
  roomId: string;
  attendeeId: string;
}

export interface BulkCreateEnrollmentsData {
  roomId: string;
  attendeeIds: string[];
}

export interface GetEnrollmentsResponse {
  success: boolean;
  enrollments: Enrollment[];
  message?: string;
}

export interface EnrollmentResponse {
  success: boolean;
  enrollment: Enrollment;
  message?: string;
}

/**
 * Create enrollment
 */
export const createEnrollment = async (data: CreateEnrollmentData): Promise<EnrollmentResponse> => {
  validateRequired(data.roomId, 'Room ID');
  validateRequired(data.attendeeId, 'Attendee ID');
  
  return handleApiRequest<EnrollmentResponse>(
    () => apiClient.request<EnrollmentResponse['enrollment']>('/enrollments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    'Failed to create enrollment'
  );
};

/**
 * Get all enrollments
 */
export const getEnrollments = async (filters?: {
  roomId?: string;
  attendeeId?: string;
}): Promise<GetEnrollmentsResponse> => {
  const params = new URLSearchParams();
  if (filters?.roomId) params.append('roomId', filters.roomId);
  if (filters?.attendeeId) params.append('attendeeId', filters.attendeeId);
  
  const queryString = params.toString();
  const url = `/enrollments${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetEnrollmentsResponse>(
    () => apiClient.request<GetEnrollmentsResponse['enrollments']>(url, { method: 'GET' }),
    'Failed to fetch enrollments'
  );
};

/**
 * Get enrollment by UUID
 */
export const getEnrollmentByUuid = async (uuid: string): Promise<EnrollmentResponse> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<EnrollmentResponse>(
    () => apiClient.request<EnrollmentResponse['enrollment']>(`/enrollments/${uuid}`, { method: 'GET' }),
    `Failed to fetch enrollment with UUID: ${uuid}`
  );
};

/**
 * Delete enrollment (unenroll)
 */
export const deleteEnrollment = async (uuid: string): Promise<{ success: boolean; message?: string }> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<{ success: boolean; message?: string }>(
    () => apiClient.request(`/enrollments/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete enrollment with UUID: ${uuid}`
  );
};

/**
 * Bulk create enrollments
 */
export const bulkCreateEnrollments = async (data: BulkCreateEnrollmentsData): Promise<GetEnrollmentsResponse> => {
  validateRequired(data.roomId, 'Room ID');
  if (!Array.isArray(data.attendeeIds) || data.attendeeIds.length === 0) {
    throw new Error('Attendee IDs array is required and must not be empty');
  }
  
  return handleApiRequest<GetEnrollmentsResponse>(
    () => apiClient.request<GetEnrollmentsResponse['enrollments']>('/enrollments/bulk', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    'Failed to bulk create enrollments'
  );
};

/**
 * Get enrollments for a room
 */
export const getEnrollmentsByRoom = async (roomId: string): Promise<GetEnrollmentsResponse> => {
  validateRequired(roomId, 'Room ID');
  
  return handleApiRequest<GetEnrollmentsResponse>(
    () => apiClient.request<GetEnrollmentsResponse['enrollments']>(`/enrollments/room/${roomId}`, { method: 'GET' }),
    `Failed to fetch enrollments for room: ${roomId}`
  );
};
