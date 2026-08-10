"use client";

/**
 * AuthContext.
 * Manages the user authentication state, profile, and permissions across the application.
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/features/common/constants/routes';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { isTokenExpired } from '@/features/auth/utils/tokenUtils';
import { fetchWithAuth } from '@/lib/apiClient';

interface AuthContextType {
  userEmail: string | null;
  userProfile: any | null;
  hasPermission: (moduleId: string, action: string) => boolean;
  hasModuleAccess: (moduleId: string) => boolean;
  refreshProfile: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = sessionStorage.getItem("token");
    if (!token || isTokenExpired(token)) return;

    try {
      const response = await fetchWithAuth(API_ENDPOINTS.AUTH.PROFILE);
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.data || data.user || data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const email = sessionStorage.getItem("userEmail");
      const token = sessionStorage.getItem("token");
      
      if (!email || !token || isTokenExpired(token)) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userEmail");
        router.push(`${ROUTES.LOGIN}?session_expired=true`);
        setLoading(false);
        return;
      } 
      
      setUserEmail(email);
      await fetchProfile();
      setLoading(false);
    };

    initAuth();
  }, [router]);

  // Global click listener to refresh profile
  useEffect(() => {
    const handleClick = () => {
      // Debounce or throttle could be added here if needed
      fetchProfile();
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    setUserProfile(null);
    setUserEmail(null);
    router.push(ROUTES.LOGIN);
  };

  const hasPermission = (moduleId: string, action: string): boolean => {
    if (!userProfile || !userProfile.permissions) return false;
    
    // Check for super admin wildcard
    if (userProfile.permissions["*"] && userProfile.permissions["*"].includes("*")) {
      return true;
    }

    const modulePermissions = userProfile.permissions[moduleId];
    if (!Array.isArray(modulePermissions)) return false;
    
    // Check for module-level wildcard
    if (modulePermissions.includes("*")) {
      return true;
    }

    return modulePermissions.includes(action);
  };

  const hasModuleAccess = (moduleId: string): boolean => {
    if (!userProfile || !userProfile.permissions) return false;
    
    // Check for super admin wildcard
    if (userProfile.permissions["*"] && userProfile.permissions["*"].includes("*")) {
      return true;
    }

    return moduleId in userProfile.permissions;
  };

  return (
    <AuthContext.Provider value={{ userEmail, userProfile, hasPermission, hasModuleAccess, refreshProfile: fetchProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
