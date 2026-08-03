/**
 * useDashboard Hook.
 * Custom React hook for useDashboard.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/features/common/constants/routes';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { isTokenExpired } from '@/features/auth/utils/tokenUtils';
import { fetchWithAuth } from '@/lib/apiClient';

export function useDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in and token is valid
    const email = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem("token");
    
    if (!email || !token || isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userEmail");
      router.push(`${ROUTES.LOGIN}?session_expired=true`);
      return;
    } 
    
    Promise.resolve().then(() => setUserEmail(email));

    // Fetch user profile
    const loadProfile = async () => {
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.AUTH.PROFILE);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user || data);
        }
      } catch (error) {
        // fetchWithAuth will automatically handle 401s and redirect to login
        console.error("Failed to fetch profile:", error);
      }
    };

    loadProfile();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    router.push(ROUTES.LOGIN);
  };

  return {
    userEmail,
    userProfile,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogout
  };
}

