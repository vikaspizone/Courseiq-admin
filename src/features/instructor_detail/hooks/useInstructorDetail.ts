/**
 * useInstructorDetail hook.
 * Manages state and interactions for the instructor detail view.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/features/common/constants/routes';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { isTokenExpired } from '@/features/auth/utils/tokenUtils';
import { fetchWithAuth } from '@/lib/apiClient';

export function useInstructorDetail() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const email = sessionStorage.getItem("userEmail");
        const token = sessionStorage.getItem("token");
        
        if (!email || !token || isTokenExpired(token)) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userEmail");
            router.push(`${ROUTES.LOGIN}?session_expired=true`);
            return;
        } 
        
        Promise.resolve().then(() => setUserEmail(email));

        const loadProfile = async () => {
            try {
                const response = await fetchWithAuth(API_ENDPOINTS.AUTH.PROFILE);
                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data.user || data);
                }
            } catch (error) {
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

    const handleFollow = () => {
        if (!isFollowing) {
            setIsFollowing(true);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } else {
            setIsFollowing(false);
        }
    };

    return {
        userEmail,
        userProfile,
        isSidebarOpen,
        setIsSidebarOpen,
        handleLogout,
        isFollowing,
        handleFollow,
        showToast
    };
}

