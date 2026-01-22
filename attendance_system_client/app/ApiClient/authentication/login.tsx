import apiClient from '../apiClient';
import { handleApiRequest, validateRequired } from '@/app/Utils/errorHandler';
import { setAccessToken, setRefreshToken, clearTokens } from '@/app/Utils/tokenStorage';

export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    uuid: string;
    firstName: string;
    role: string;
    email: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

export interface RegisterUserData {
  firstName: string;
  role?: string;
  email: string;
  password: string;
  department?: string;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  validateRequired(email, 'Email');
  validateRequired(password, 'Password');
  
  const response = await handleApiRequest<LoginResponse>(
    () => apiClient.request<LoginResponse['user']>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    'Failed to login'
  );

  // Store tokens if provided
  if (response.accessToken) {
    setAccessToken(response.accessToken);
  }
  if (response.refreshToken) {
    setRefreshToken(response.refreshToken);
  }

  return response;
};

export const register = async (userData: RegisterUserData): Promise<LoginResponse> => {
  validateRequired(userData.firstName, 'First name');
  validateRequired(userData.email, 'Email');
  validateRequired(userData.password, 'Password');
  
  const response = await handleApiRequest<LoginResponse>(
    () => apiClient.request<LoginResponse['user']>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    'Failed to register user'
  );

  // Store tokens if provided
  if (response.accessToken) {
    setAccessToken(response.accessToken);
  }
  if (response.refreshToken) {
    setRefreshToken(response.refreshToken);
  }

  return response;
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await handleApiRequest<LogoutResponse>(
      () => apiClient.request('/auth/logout', {
        method: 'POST',
      }),
      'Failed to logout'
    );
    
    // Clear tokens regardless of API response
    clearTokens();
    return response;
  } catch (error) {
    // Clear tokens even if API call fails
    clearTokens();
    throw error;
  }
};

export const getCurrentUser = async (): Promise<LoginResponse> => {
  return handleApiRequest<LoginResponse>(
    () => apiClient.request<LoginResponse['user']>('/auth/me'),
    'Failed to get current user'
  );
};
