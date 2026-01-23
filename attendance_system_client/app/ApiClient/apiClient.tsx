import { getAccessToken, setAccessToken, getRefreshToken, clearTokens, isAccessTokenExpired } from '@/app/Utils/tokenStorage';
import { ApiError } from '@/app/Utils/errorHandler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  user?: T;
}

class ApiClient {
  private baseURL: string;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Refresh access token using refresh token
   * This method bypasses the normal request flow to avoid recursion
   */
  private async refreshAccessToken(): Promise<string | null> {
    // If already refreshing, return the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Direct fetch to avoid recursion (don't use this.request)
        const response = await fetch(`${this.baseURL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          // Refresh failed, clear tokens and redirect to login
          clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          throw new Error(data.message || 'Token refresh failed');
        }

        // Store new access token
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          return data.accessToken;
        }

        throw new Error('No access token in refresh response');
      } catch (error) {
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw error;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Get valid access token, refreshing if necessary
   */
  private async getValidAccessToken(): Promise<string | null> {
    const accessToken = getAccessToken();
    
    // If no access token, try to refresh
    if (!accessToken) {
      return await this.refreshAccessToken();
    }

    // If token is expired or about to expire, refresh it
    if (isAccessTokenExpired()) {
      return await this.refreshAccessToken();
    }

    return accessToken;
  }

  /**
   * Make API request with automatic token management
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Check if this is an unauthenticated endpoint (login, register, etc.)
    const isUnauthenticatedEndpoint = 
      endpoint.includes('/auth/login') || 
      endpoint.includes('/auth/register') || 
      endpoint.includes('/auth/logout') ||
      endpoint.includes('/auth/refresh') ||
      endpoint.includes('/auth/google') ||
      endpoint.includes('/health');
    
    // Get valid access token only for authenticated endpoints
    const accessToken = isUnauthenticatedEndpoint 
      ? null 
      : await this.getValidAccessToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options.headers,
      },
      credentials: 'include', // Keep for any cookie-based auth fallback
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new ApiError(
          `Server returned non-JSON response: ${text.substring(0, 100)}`,
          response.status
        );
      }
      
      const data = await response.json();

      // If 401 and we have a refresh token, try refreshing once
      if (response.status === 401 && getRefreshToken() && !this.isRefreshing) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          // Retry the request with new token
          const retryConfig: RequestInit = {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
              ...options.headers,
            },
            credentials: 'include',
          };
          
          const retryResponse = await fetch(url, retryConfig);
          
          // Check if retry response is JSON
          const retryContentType = retryResponse.headers.get('content-type');
          if (!retryContentType || !retryContentType.includes('application/json')) {
            const text = await retryResponse.text();
            throw new ApiError(
              `Server returned non-JSON response after retry: ${text.substring(0, 100)}`,
              retryResponse.status
            );
          }
          
          const retryData = await retryResponse.json();
          
          if (!retryResponse.ok) {
            throw new ApiError(
              retryData.message || 'Request failed after token refresh',
              retryResponse.status,
              retryData
            );
          }
          
          return retryData;
        }
      }

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Request failed',
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors
      if (error instanceof Error) {
        throw new ApiError(
          `Network error: ${error.message}`,
          undefined,
          error
        );
      }
      
      throw new ApiError(
        'Unknown error occurred',
        500,
        error
      );
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiClient();
