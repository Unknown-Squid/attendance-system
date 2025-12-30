import apiClient from '../apiClient';

export interface User {
  uuid: string;
  firstName: string;
  role: 'admin' | 'teacher' | 'student' | 'staff';
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  firstName: string;
  role?: 'admin' | 'teacher' | 'student' | 'staff';
  email: string;
  password: string;
}

export interface UpdateUserData {
  firstName?: string;
  role?: 'admin' | 'teacher' | 'student' | 'staff';
  email?: string;
  password?: string;
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

/**
 * Get all users
 */
export async function getUsers(filters?: { role?: string; search?: string }): Promise<GetUsersResponse> {
  const params = new URLSearchParams();
  if (filters?.role) params.append('role', filters.role);
  if (filters?.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const url = `/users${queryString ? `?${queryString}` : ''}`;
  
  const response = await apiClient.request<any>(url, {
    method: 'GET',
  });
  return response as unknown as GetUsersResponse;
}

/**
 * Get user by UUID
 */
export async function getUserByUuid(uuid: string): Promise<UserResponse> {
  const response = await apiClient.request<any>(`/users/${uuid}`, {
    method: 'GET',
  });
  return response as unknown as UserResponse;
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserData): Promise<UserResponse> {
  const response = await apiClient.request<any>('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  return response as unknown as UserResponse;
}

/**
 * Update user
 */
export async function updateUser(uuid: string, userData: UpdateUserData): Promise<UserResponse> {
  const response = await apiClient.request<any>(`/users/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  return response as unknown as UserResponse;
}

/**
 * Delete user
 */
export async function deleteUser(uuid: string): Promise<{ success: boolean; message?: string }> {
  const response = await apiClient.request<any>(`/users/${uuid}`, {
    method: 'DELETE',
  });
  return response as unknown as { success: boolean; message?: string };
}

