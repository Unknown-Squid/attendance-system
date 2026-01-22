import apiClient from '../apiClient';
import { handleApiRequest } from '@/app/Utils/errorHandler';
import { setAccessToken, setRefreshToken } from '@/app/Utils/tokenStorage';

export interface OAuthResponse {
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

/**
 * Initiate OAuth login with Google
 * This redirects to Google OAuth page
 */
export const initiateGoogleOAuth = (): void => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
  const googleAuthUrl = `${API_BASE_URL}/auth/google`;
  
  // Redirect to Google OAuth
  if (typeof window !== 'undefined') {
    window.location.href = googleAuthUrl;
  }
};

/**
 * Handle OAuth callback after redirect
 * This is called when user returns from OAuth provider
 */
export const handleOAuthCallback = async (code: string, provider: 'google' | 'github' = 'google'): Promise<OAuthResponse> => {
  const response = await handleApiRequest<OAuthResponse>(
    () => apiClient.request<OAuthResponse['user']>(`/auth/${provider}/callback`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),
    `Failed to authenticate with ${provider}`
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

/**
 * Alternative: OAuth with popup window (better UX)
 */
export const initiateGoogleOAuthPopup = (): Promise<OAuthResponse> => {
  return new Promise((resolve, reject) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      `${API_BASE_URL}/auth/google`,
      'Google OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      reject(new Error('Popup blocked. Please allow popups for this site.'));
      return;
    }

    // Listen for OAuth callback
    const messageListener = async (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data.type === 'OAUTH_SUCCESS') {
        window.removeEventListener('message', messageListener);
        popup.close();

        const { accessToken, refreshToken, user } = event.data;
        
        if (accessToken) {
          setAccessToken(accessToken);
        }
        if (refreshToken) {
          setRefreshToken(refreshToken);
        }

        resolve({
          success: true,
          user,
          accessToken,
          refreshToken,
        });
      } else if (event.data.type === 'OAUTH_ERROR') {
        window.removeEventListener('message', messageListener);
        popup.close();
        reject(new Error(event.data.error || 'OAuth authentication failed'));
      }
    };

    window.addEventListener('message', messageListener);

    // Handle popup closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageListener);
        reject(new Error('OAuth popup was closed'));
      }
    }, 1000);
  });
};
