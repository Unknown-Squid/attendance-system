import apiClient from '../apiClient';
import { handleApiRequest, validateRequired, validateNotEmpty } from '@/app/Utils/errorHandler';

export interface AttendanceRecord {
  uuid: string;
  roomId: string;
  attendeeId: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  qrCode?: string;
  signature?: string;
  notes?: string;
  markedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  room?: any;
  attendee?: any;
}

export interface CreateAttendanceRecordData {
  roomId: string;
  attendeeId: string;
  date: string;
  time?: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
  qrCode?: string;
  signature?: string;
  notes?: string;
}

export interface UpdateAttendanceRecordData {
  status?: 'present' | 'absent' | 'late' | 'excused';
  time?: string;
  qrCode?: string;
  signature?: string;
  notes?: string;
}

export interface GetAttendanceRecordsResponse {
  success: boolean;
  records: AttendanceRecord[];
  message?: string;
}

export interface AttendanceRecordResponse {
  success: boolean;
  record: AttendanceRecord;
  message?: string;
}

/**
 * Create attendance record
 */
export const createAttendanceRecord = async (data: CreateAttendanceRecordData): Promise<AttendanceRecordResponse> => {
  validateRequired(data.roomId, 'Room ID');
  validateRequired(data.attendeeId, 'Attendee ID');
  validateRequired(data.date, 'Date');
  
  return handleApiRequest<AttendanceRecordResponse>(
    () => apiClient.request<AttendanceRecordResponse['record']>('/attendance-records', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    'Failed to create attendance record'
  );
};

/**
 * Get all attendance records
 */
export const getAttendanceRecords = async (filters?: {
  roomId?: string;
  attendeeId?: string;
  date?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<GetAttendanceRecordsResponse> => {
  const params = new URLSearchParams();
  if (filters?.roomId) params.append('roomId', filters.roomId);
  if (filters?.attendeeId) params.append('attendeeId', filters.attendeeId);
  if (filters?.date) params.append('date', filters.date);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
  if (filters?.dateTo) params.append('dateTo', filters.dateTo);
  
  const queryString = params.toString();
  const url = `/attendance-records${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetAttendanceRecordsResponse>(
    () => apiClient.request<GetAttendanceRecordsResponse['records']>(url, { method: 'GET' }),
    'Failed to fetch attendance records'
  );
};

/**
 * Get attendance record by UUID
 */
export const getAttendanceRecordByUuid = async (uuid: string): Promise<AttendanceRecordResponse> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<AttendanceRecordResponse>(
    () => apiClient.request<AttendanceRecordResponse['record']>(`/attendance-records/${uuid}`, { method: 'GET' }),
    `Failed to fetch attendance record with UUID: ${uuid}`
  );
};

/**
 * Update attendance record
 */
export const updateAttendanceRecord = async (uuid: string, data: UpdateAttendanceRecordData): Promise<AttendanceRecordResponse> => {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(data, 'Update data is required');
  
  return handleApiRequest<AttendanceRecordResponse>(
    () => apiClient.request<AttendanceRecordResponse['record']>(`/attendance-records/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    `Failed to update attendance record with UUID: ${uuid}`
  );
};

/**
 * Delete attendance record
 */
export const deleteAttendanceRecord = async (uuid: string): Promise<{ success: boolean; message?: string }> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<{ success: boolean; message?: string }>(
    () => apiClient.request(`/attendance-records/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete attendance record with UUID: ${uuid}`
  );
};

/**
 * Get attendance records for a room
 */
export const getAttendanceRecordsByRoom = async (roomId: string, filters?: {
  date?: string;
  status?: string;
}): Promise<GetAttendanceRecordsResponse> => {
  validateRequired(roomId, 'Room ID');
  
  const params = new URLSearchParams();
  if (filters?.date) params.append('date', filters.date);
  if (filters?.status) params.append('status', filters.status);
  
  const queryString = params.toString();
  const url = `/attendance-records/room/${roomId}${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetAttendanceRecordsResponse>(
    () => apiClient.request<GetAttendanceRecordsResponse['records']>(url, { method: 'GET' }),
    `Failed to fetch attendance records for room: ${roomId}`
  );
};
