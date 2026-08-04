'use client';
/**
 * useRegister hook.
 * Custom hook providing registration state and methods.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/features/common/constants/routes";
import { API_ENDPOINTS } from "@/features/common/constants/apiEndpoints";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const target = e.target as typeof e.target & {
      fullname: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.fullname.value;
    const email = target.email.value;
    const password = target.password.value;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch (err) {
          // ignore
        }
        throw new Error(errData?.message || errData?.error || "Registration failed");
      }
      
      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [success, router]);

  return {
    loading,
    success,
    error,
    showPassword,
    setShowPassword,
    bgGradient,
    handleRegister
  };
}
