import apiClient from '../apiClient';
import { handleApiRequest, validateRequired, validateNotEmpty, ApiError } from '@/app/Utils/errorHandler';

export interface AttendanceRoom {
  uuid: string;
  enrollmentKey: string;
  type: 'regular' | 'event';
  category: 'regular-class' | 'workshop' | 'examination' | 'event' | 'archive';
  data: any;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAttendanceRoomData {
  enrollmentKey: string;
  type: 'regular' | 'event';
  category: 'regular-class' | 'workshop' | 'examination' | 'event' | 'archive';
  data: any;
}

export interface UpdateAttendanceRoomData {
  enrollmentKey?: string;
  type?: 'regular' | 'event';
  category?: 'regular-class' | 'workshop' | 'examination' | 'event' | 'archive';
  data?: any;
}

export interface GetRoomsResponse {
  success: boolean;
  rooms: AttendanceRoom[];
  message?: string;
}

export interface RoomResponse {
  success: boolean;
  room: AttendanceRoom;
  message?: string;
}

export interface DeleteRoomResponse {
  success: boolean;
  message?: string;
}

// Re-export ApiError for convenience
export { ApiError as AttendanceRoomError };

/**
 * Get all attendance rooms
 */
export async function getAttendanceRooms(filters?: { category?: string; type?: string }): Promise<GetRoomsResponse> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.type) params.append('type', filters.type);
  
  const queryString = params.toString();
  const url = `/attendance-rooms${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetRoomsResponse>(
    () => apiClient.request<GetRoomsResponse['rooms']>(url, { method: 'GET' }),
    'Failed to fetch attendance rooms'
  );
}

/**
 * Get room by UUID
 */
export async function getAttendanceRoomByUuid(uuid: string): Promise<RoomResponse> {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<RoomResponse>(
    () => apiClient.request<RoomResponse['room']>(`/attendance-rooms/${uuid}`, { method: 'GET' }),
    `Failed to fetch attendance room with UUID: ${uuid}`
  );
}

/**
 * Get room by enrollment key
 */
export async function getAttendanceRoomByEnrollmentKey(enrollmentKey: string): Promise<RoomResponse> {
  validateRequired(enrollmentKey, 'Enrollment key');
  
  const encodedKey = encodeURIComponent(enrollmentKey);
  
  return handleApiRequest<RoomResponse>(
    () => apiClient.request<RoomResponse['room']>(`/attendance-rooms/enrollment/${encodedKey}`, { method: 'GET' }),
    `Failed to fetch attendance room with enrollment key: ${enrollmentKey}`
  );
}

/**
 * Create a new attendance room
 */
export async function createAttendanceRoom(roomData: CreateAttendanceRoomData): Promise<RoomResponse> {
  // Validate required fields
  validateRequired(roomData.enrollmentKey, 'Enrollment key');
  validateRequired(roomData.type, 'Type');
  validateRequired(roomData.category, 'Category');
  validateRequired(roomData.data, 'Data');
  
  return handleApiRequest<RoomResponse>(
    () => apiClient.request<RoomResponse['room']>('/attendance-rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    }),
    'Failed to create attendance room'
  );
}

/**
 * Update attendance room
 */
export async function updateAttendanceRoom(uuid: string, roomData: UpdateAttendanceRoomData): Promise<RoomResponse> {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(roomData, 'Update data is required');
  
  return handleApiRequest<RoomResponse>(
    () => apiClient.request<RoomResponse['room']>(`/attendance-rooms/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    }),
    `Failed to update attendance room with UUID: ${uuid}`
  );
}

/**
 * Delete attendance room
 */
export async function deleteAttendanceRoom(uuid: string): Promise<DeleteRoomResponse> {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<DeleteRoomResponse>(
    () => apiClient.request<DeleteRoomResponse>(`/attendance-rooms/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete attendance room with UUID: ${uuid}`
  );
}

/**
 * Archive attendance room
 */
export async function archiveAttendanceRoom(uuid: string): Promise<RoomResponse> {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<RoomResponse>(
    () => apiClient.request<RoomResponse['room']>(`/attendance-rooms/${uuid}/archive`, {
      method: 'PATCH',
    }),
    `Failed to archive attendance room with UUID: ${uuid}`
  );
}
