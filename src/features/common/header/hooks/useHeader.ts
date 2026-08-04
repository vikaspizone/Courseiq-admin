/**
 * useHeader hook.
 * Custom hook for managing the state and behavior of the Header component,
 * including user profile dropdown and outside click detection.
 */
import { useState, useRef, useEffect } from 'react';

interface UseHeaderProps {
  userProfile?: any;
  userEmail?: string | null;
}

export function useHeader({ userProfile, userEmail }: UseHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = userProfile?.first_name 
    ? `${userProfile.first_name} ${userProfile.last_name || ''}`.trim() 
    : userProfile?.name || userEmail || "User";

  return {
    isProfileOpen,
    setIsProfileOpen,
    profileRef,
    userName
  };
}
