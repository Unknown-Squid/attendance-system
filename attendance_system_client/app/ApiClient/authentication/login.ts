import apiClient from '../apiClient';

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    uuid: string;
    firstName: string;
    role: string;
    email: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return apiClient.request<LoginResponse['user']>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (userData: {
  firstName: string;
  role?: string;
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  return apiClient.request<LoginResponse['user']>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const logout = async (): Promise<{ success: boolean; message?: string }> => {
  return apiClient.request('/auth/logout', {
    method: 'POST',
  });
};

export const getCurrentUser = async (): Promise<LoginResponse> => {
  return apiClient.request<LoginResponse['user']>('/auth/me');
};

