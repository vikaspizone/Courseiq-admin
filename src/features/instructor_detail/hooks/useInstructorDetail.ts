/**
 * useInstructorDetail hook.
 * Manages state and interactions for the instructor detail view.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useInstructorDetail() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const email = sessionStorage.getItem("userEmail");
        if (!email) {
            router.push("/auth/login");
        } else {
            setUserEmail(email);
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem("userEmail");
        router.push("/auth/login");
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
        isSidebarOpen,
        setIsSidebarOpen,
        handleLogout,
        isFollowing,
        handleFollow,
        showToast
    };
}
