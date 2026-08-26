/**
 * API Client Utility.
 * Centralized utility for making authenticated HTTP requests to the backend API.
 */

import { ROUTES } from '@/features/common/constants/routes';
import { AUTH_MESSAGES } from "@/features/auth/constants";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = sessionStorage.getItem("token");
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "69420",
    ...((options.headers as Record<string, string>) || {}),
  };

  const isFormData = typeof window !== 'undefined' && typeof FormData !== 'undefined' && options.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const method = options.method?.toUpperCase() || 'GET';
  if (['POST', 'PUT', 'PATCH'].includes(method) && typeof options.body === 'string') {
    try {
      const parsedBody = JSON.parse(options.body);
      const removeEmptyStrings = (obj: any): any => {
        if (Array.isArray(obj)) return obj.map(removeEmptyStrings);
        if (obj !== null && typeof obj === 'object') {
          const newObj: Record<string, any> = {};
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const val = obj[key];
              if (val !== "") {
                newObj[key] = removeEmptyStrings(val);
              }
            }
          }
          return newObj;
        }
        return obj;
      };
      options.body = JSON.stringify(removeEmptyStrings(parsedBody));
    } catch (e) {
      // Ignore parse errors
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errData;
    try {
      errData = await response.clone().json();
    } catch (e) {
      // ignore
    }
    
    const apiMsg = errData?.message || errData?.error;
    const lang = (typeof window !== 'undefined' ? localStorage.getItem('appLanguage') : 'en') || 'en';
    const messages = AUTH_MESSAGES[lang as keyof typeof AUTH_MESSAGES] || AUTH_MESSAGES.en;

    if (response.status === 401) {
      // Handle unauthorized error (token expired, etc.)
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userEmail");
      if (typeof window !== "undefined") {
        window.location.href = `${ROUTES.LOGIN}?session_expired=true`;
      }
      throw new Error(apiMsg || messages.SESSION_EXPIRED || "Session expired. Please log in again.");
    }

    if (response.status >= 500) {
      throw new Error(apiMsg || messages.SERVER_ERROR || "Server Error. Please try again later.");
    }
    
    throw new Error(apiMsg || "An error occurred");
  }

  return response;
}
