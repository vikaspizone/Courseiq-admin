/**
 * Utility functions for authentication tokens
 */

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) {
    // If we can't decode it or it doesn't have an expiry, 
    // we assume it's valid until the server says 401
    return false; 
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
