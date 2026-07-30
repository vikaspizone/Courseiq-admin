/**
 * useDashboard.ts
 * This file is part of the feature module.
 */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    router.push("/login");
  };

  return {
    userEmail,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogout
  };
}
