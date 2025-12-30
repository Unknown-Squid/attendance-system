import apiClient from '../apiClient';

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

/**
 * Get all attendance rooms
 */
export async function getAttendanceRooms(filters?: { category?: string; type?: string }): Promise<GetRoomsResponse> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.type) params.append('type', filters.type);
  
  const queryString = params.toString();
  const url = `/attendance-rooms${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.request<any>(url, {
    method: 'GET',
  });
  return response as unknown as GetRoomsResponse;
}

/**
 * Get room by UUID
 */
export async function getAttendanceRoomByUuid(uuid: string): Promise<RoomResponse> {
  const response = await apiClient.request<any>(`/attendance-rooms/${uuid}`, {
    method: 'GET',
  });
  return response as unknown as RoomResponse;
}

/**
 * Get room by enrollment key
 */
export async function getAttendanceRoomByEnrollmentKey(enrollmentKey: string): Promise<RoomResponse> {
  const encodedKey = encodeURIComponent(enrollmentKey);
  const response = await apiClient.request<any>(`/attendance-rooms/enrollment/${encodedKey}`, {
    method: 'GET',
  });
  return response as unknown as RoomResponse;
}

/**
 * Create a new attendance room
 */
export async function createAttendanceRoom(roomData: CreateAttendanceRoomData): Promise<RoomResponse> {
  const response = await apiClient.request<any>('/attendance-rooms', {
    method: 'POST',
    body: JSON.stringify(roomData),
  });
  return response as unknown as RoomResponse;
}

/**
 * Update attendance room
 */
export async function updateAttendanceRoom(uuid: string, roomData: UpdateAttendanceRoomData): Promise<RoomResponse> {
  const response = await apiClient.request<any>(`/attendance-rooms/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(roomData),
  });
  return response as unknown as RoomResponse;
}

/**
 * Delete attendance room
 */
export async function deleteAttendanceRoom(uuid: string): Promise<{ success: boolean; message?: string }> {
  const response = await apiClient.request<any>(`/attendance-rooms/${uuid}`, {
    method: 'DELETE',
  });
  return response as unknown as { success: boolean; message?: string };
}

/**
 * Archive attendance room
 */
export async function archiveAttendanceRoom(uuid: string): Promise<RoomResponse> {
  const response = await apiClient.request<any>(`/attendance-rooms/${uuid}/archive`, {
    method: 'PATCH',
  });
  return response as unknown as RoomResponse;
}

