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
      
      const data = await response.json();
      const payload = data.data || data;
      const token = payload.accessToken || payload.token || payload.access_token;
      
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userEmail", payload.user?.email || email);
        if (payload.refresh_token) {
          sessionStorage.setItem("refresh_token", payload.refresh_token);
        }

        // Fetch user profile immediately after signup
        try {
          const profileResponse = await fetch(`${baseUrl}${API_ENDPOINTS.AUTH.PROFILE}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            }
          });
          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            const userProfile = profileData.data || profileData.user || profileData;
            sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          }
        } catch (profileError) {
          console.error("Failed to fetch profile during signup:", profileError);
        }
      }

      setSuccess(true);
      // Redirect after success
      setTimeout(() => {
        if (token) {
          router.push(ROUTES.DASHBOARD);
        } else {
          router.push(ROUTES.LOGIN);
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Removed buggy useEffect that redirected to DASHBOARD automatically

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
