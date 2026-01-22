import apiClient from '../apiClient';
import { handleApiRequest, validateRequired, validateNotEmpty } from '@/app/Utils/errorHandler';

export interface Subject {
  uuid: string;
  code: string;
  name: string;
  description?: string;
  credits?: number;
  department?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSubjectData {
  code: string;
  name: string;
  description?: string;
  credits?: number;
  department?: string;
  status?: 'active' | 'inactive' | 'archived';
}

export interface UpdateSubjectData {
  code?: string;
  name?: string;
  description?: string;
  credits?: number;
  department?: string;
  status?: 'active' | 'inactive' | 'archived';
}

export interface GetSubjectsResponse {
  success: boolean;
  subjects: Subject[];
  message?: string;
}

export interface SubjectResponse {
  success: boolean;
  subject: Subject;
  message?: string;
}

/**
 * Get all subjects
 */
export const getSubjects = async (filters?: {
  department?: string;
  status?: string;
  search?: string;
}): Promise<GetSubjectsResponse> => {
  const params = new URLSearchParams();
  if (filters?.department) params.append('department', filters.department);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/subjects${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetSubjectsResponse>(
    () => apiClient.request<GetSubjectsResponse['subjects']>(url, { method: 'GET' }),
    'Failed to fetch subjects'
  );
};

/**
 * Get subject by UUID
 */
export const getSubjectByUuid = async (uuid: string): Promise<SubjectResponse> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<SubjectResponse>(
    () => apiClient.request<SubjectResponse['subject']>(`/subjects/${uuid}`, { method: 'GET' }),
    `Failed to fetch subject with UUID: ${uuid}`
  );
};

/**
 * Get subject by code
 */
export const getSubjectByCode = async (code: string): Promise<SubjectResponse> => {
  validateRequired(code, 'Code');
  
  return handleApiRequest<SubjectResponse>(
    () => apiClient.request<SubjectResponse['subject']>(`/subjects/code/${encodeURIComponent(code)}`, { method: 'GET' }),
    `Failed to fetch subject with code: ${code}`
  );
};

/**
 * Create a new subject
 */
export const createSubject = async (subjectData: CreateSubjectData): Promise<SubjectResponse> => {
  validateRequired(subjectData.code, 'Code');
  validateRequired(subjectData.name, 'Name');
  
  return handleApiRequest<SubjectResponse>(
    () => apiClient.request<SubjectResponse['subject']>('/subjects', {
      method: 'POST',
      body: JSON.stringify(subjectData),
    }),
    'Failed to create subject'
  );
};

/**
 * Update subject
 */
export const updateSubject = async (uuid: string, subjectData: UpdateSubjectData): Promise<SubjectResponse> => {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(subjectData, 'Update data is required');
  
  return handleApiRequest<SubjectResponse>(
    () => apiClient.request<SubjectResponse['subject']>(`/subjects/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(subjectData),
    }),
    `Failed to update subject with UUID: ${uuid}`
  );
};

/**
 * Delete subject
 */
export const deleteSubject = async (uuid: string): Promise<{ success: boolean; message?: string }> => {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<{ success: boolean; message?: string }>(
    () => apiClient.request(`/subjects/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete subject with UUID: ${uuid}`
  );
};
