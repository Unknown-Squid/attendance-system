// Token storage utility for managing JWT tokens securely
// Uses memory storage for access tokens and localStorage for refresh tokens
// Migrate refresh token to HttpOnly cookies for production (backend sets cookies)

const REFRESH_TOKEN_KEY = 'refresh_token';
const REFRESH_TOKEN_EXPIRY_KEY = 'refresh_token_expiry';

// Memory storage for access token (not persisted, lost on page refresh)
// This protects against XSS attacks - token not accessible via localStorage
let accessTokenMemory: string | null = null;
let accessTokenExpiry: number | null = null;

/**
 * Store access token in memory only (not persisted)
 * This prevents XSS attacks and limits token exposure
 * Token is lost on page refresh - use refresh token to get new access token
 */
export const setAccessToken = (token: string): void => {
  accessTokenMemory = token;
  
  // Decode token to get expiry time (client-side only, not for security validation)
  try {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
      accessTokenExpiry = decoded.exp * 1000; // Convert to milliseconds
    }
  } catch (error) {
    console.warn('Failed to decode access token for expiry tracking:', error);
  }
};

/**
 * Get access token from memory
 * Returns null if not set or expired
 */
export const getAccessToken = (): string | null => {
  // Check if token exists and is not expired
  if (!accessTokenMemory) {
    return null;
  }
  
  // If we have expiry info, check if expired
  if (accessTokenExpiry) {
    const now = Date.now();
    const bufferTime = 60 * 1000; // 1 minute buffer
    if (accessTokenExpiry - now < bufferTime) {
      // Token expired, clear it
      accessTokenMemory = null;
      accessTokenExpiry = null;
      return null;
    }
  }
  
  return accessTokenMemory;
};

/**
 * Clear access token from memory
 */
export const clearAccessToken = (): void => {
  accessTokenMemory = null;
  accessTokenExpiry = null;
};

/**
 * Store refresh token in localStorage
 * TODO: Migrate to HttpOnly cookie (backend should set cookie)
 * For now, this is acceptable for MVP but should be improved for production
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Store token
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    
    // Store expiry for client-side tracking (optional, backend validates)
    try {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp) {
        localStorage.setItem(REFRESH_TOKEN_EXPIRY_KEY, decoded.exp.toString());
      }
    } catch (error) {
      // Ignore decode errors for refresh token
    }
  } catch (error) {
    // Handle localStorage quota exceeded or disabled
    console.error('Failed to store refresh token:', error);
    throw new Error('Failed to store refresh token. Please check browser storage settings.');
  }
};

/**
 * Get refresh token from localStorage
 * TODO: When migrated to HttpOnly cookies, this will read from cookie (backend handles)
 * For now, reads from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    // Optionally check expiry (client-side only)
    if (token) {
      const expiryStr = localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY);
      if (expiryStr) {
        const expiry = parseInt(expiryStr, 10) * 1000;
        if (expiry < Date.now()) {
          // Token expired, clear it
          clearRefreshToken();
          return null;
        }
      }
    }
    
    return token;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

/**
 * Clear refresh token from localStorage
 */
export const clearRefreshToken = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
  } catch (error) {
    console.error('Failed to clear refresh token:', error);
  }
};

/**
 * Clear all tokens (access token from memory + refresh token from localStorage)
 */
export const clearTokens = (): void => {
  clearAccessToken();
  clearRefreshToken();
};

/**
 * Check if user has tokens (is potentially authenticated)
 */
export const hasTokens = (): boolean => {
  // Check both access token (memory) and refresh token (localStorage)
  return !!(getAccessToken() || getRefreshToken());
};

/**
 * Decode JWT token to get payload (without verification)
 * WARNING: This is client-side only and should NOT be used for security validation
 * Backend must always verify token signature and expiry
 */
export const decodeToken = (token: string): any => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if access token is expired
 * Returns true if token is missing, invalid, or expired
 */
export const isAccessTokenExpired = (): boolean => {
  const token = getAccessToken();
  if (!token) return true;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    // Check if token expires in less than 1 minute (buffer time)
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const bufferTime = 60 * 1000; // 1 minute buffer

    return expirationTime - currentTime < bufferTime;
  } catch (error) {
    // If we can't decode, assume expired
    return true;
  }
};

/**
 * Check if refresh token is expired
 * Returns true if token is missing, invalid, or expired
 * NOTE: Backend always validates refresh token expiry
 */
export const isRefreshTokenExpired = (): boolean => {
  const token = getRefreshToken();
  if (!token) return true;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get token expiry time in milliseconds
 * Returns null if token is invalid or doesn't have expiry
 */
export const getTokenExpiry = (token: string): number | null => {
  try {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
      return decoded.exp * 1000; // Convert to milliseconds
    }
  } catch (error) {
    // Ignore errors
  }
  return null;
};

/**
 * Get time until access token expires (in milliseconds)
 * Returns 0 if expired, null if token is invalid
 */
export const getAccessTokenTimeToExpiry = (): number | null => {
  const token = getAccessToken();
  if (!token) return null;

  const expiry = getTokenExpiry(token);
  if (!expiry) return null;

  const timeLeft = expiry - Date.now();
  return timeLeft > 0 ? timeLeft : 0;
};

/**
 * Validate token format (basic check, not security validation)
 * Returns true if token has correct JWT structure
 */
export const isValidTokenFormat = (token: string): boolean => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }
  
  // Basic check: all parts should be base64url encoded (non-empty)
  return parts.every(part => part.length > 0);
};

/**
 * Migrate tokens to memory (call on app initialization)
 * This ensures access token is in memory, not localStorage
 */
export const migrateTokensToMemory = (): void => {
  // If access token is somehow in localStorage (old implementation), migrate it
  if (typeof window !== 'undefined') {
    const oldAccessToken = localStorage.getItem('access_token');
    if (oldAccessToken && !accessTokenMemory) {
      // Migrate to memory
      setAccessToken(oldAccessToken);
      // Remove from localStorage
      localStorage.removeItem('access_token');
      console.info('Migrated access token from localStorage to memory');
    }
  }
};
