'use client';
/**
 * useRegister hook.
 * Custom hook providing registration state and methods.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/features/common/constants/routes";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bgGradient, setBgGradient] = useState("none");
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      if (window.innerWidth > 1024) {
        Promise.resolve().then(() => setBgGradient(`radial-gradient(circle at ${x * 100}% ${y * 100}%, #ffffff 0%, #faf8ff 100%)`));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock success
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD);
      }, 1000);
    }, 1500);
  };

  useEffect(() => {
    if (success) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [success, router]);

  return {
    loading,
    success,
    bgGradient,
    handleRegister
  };
}
