import apiClient from '../apiClient';
import { handleApiRequest, validateRequired, validateNotEmpty } from '@/app/Utils/errorHandler';

export interface User {
  uuid: string;
  firstName: string;
  role: 'admin' | 'teacher' | 'student' | 'staff';
  email: string;
  department?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  firstName: string;
  role?: 'admin' | 'teacher' | 'student' | 'staff';
  email: string;
  password: string;
  department?: string;
}

export interface UpdateUserData {
  firstName?: string;
  role?: 'admin' | 'teacher' | 'student' | 'staff';
  email?: string;
  password?: string;
  department?: string;
}

export interface GetUsersResponse {
  success: boolean;
  users: User[];
  message?: string;
}

export interface UserResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
}

/**
 * Get all users
 */
export async function getUsers(filters?: { role?: string; search?: string }): Promise<GetUsersResponse> {
  const params = new URLSearchParams();
  if (filters?.role) params.append('role', filters.role);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/users${queryString ? `?${queryString}` : ''}`;
  
  return handleApiRequest<GetUsersResponse>(
    () => apiClient.request<GetUsersResponse['users']>(url, { method: 'GET' }),
    'Failed to fetch users'
  );
}

/**
 * Get user by UUID
 */
export async function getUserByUuid(uuid: string): Promise<UserResponse> {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<UserResponse>(
    () => apiClient.request<UserResponse['user']>(`/users/${uuid}`, { method: 'GET' }),
    `Failed to fetch user with UUID: ${uuid}`
  );
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserData): Promise<UserResponse> {
  validateRequired(userData.firstName, 'First name');
  validateRequired(userData.email, 'Email');
  validateRequired(userData.password, 'Password');
  
  return handleApiRequest<UserResponse>(
    () => apiClient.request<UserResponse['user']>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    'Failed to create user'
  );
}

/**
 * Update user
 */
export async function updateUser(uuid: string, userData: UpdateUserData): Promise<UserResponse> {
  validateRequired(uuid, 'UUID');
  validateNotEmpty(userData, 'Update data is required');
  
  return handleApiRequest<UserResponse>(
    () => apiClient.request<UserResponse['user']>(`/users/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
    `Failed to update user with UUID: ${uuid}`
  );
}

/**
 * Delete user
 */
export async function deleteUser(uuid: string): Promise<DeleteUserResponse> {
  validateRequired(uuid, 'UUID');
  
  return handleApiRequest<DeleteUserResponse>(
    () => apiClient.request<DeleteUserResponse>(`/users/${uuid}`, {
      method: 'DELETE',
    }),
    `Failed to delete user with UUID: ${uuid}`
  );
}
