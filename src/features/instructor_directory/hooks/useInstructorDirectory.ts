/**
 * useInstructorDirectory Hook.
 * Custom React hook for useInstructorDirectory.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useInstructorDirectory() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

    return {
        userEmail,
        isSidebarOpen,
        setIsSidebarOpen,
        handleLogout
    };
}
