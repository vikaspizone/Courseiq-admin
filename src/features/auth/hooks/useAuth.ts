"use client";
/**
 * useAuth hook.
 * Custom hook providing authentication state and methods.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/features/common/constants/routes";
import { API_ENDPOINTS } from "@/features/common/constants/apiEndpoints";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { AUTH_MESSAGES } from "../constants";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();
  
  const { language } = useLanguage();
  const messages = AUTH_MESSAGES[language];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("session_expired") === "true") {
        Promise.resolve().then(() => setSessionExpired(true));
      }
    }
  }, []);

  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch (e) {
          // ignore
        }
        const apiMsg = errData?.message || errData?.error;
        if (response.status >= 500) {
          throw new Error(apiMsg || messages.SERVER_ERROR);
        }
        throw new Error(apiMsg || messages.INVALID_CREDENTIALS);
      }

      const data = await response.json();
      const payload = data.data || data;
      
      // Save token or necessary user data
      const token = payload.accessToken || payload.token || payload.access_token;
      
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userEmail", payload.user?.email || email);
        if (payload.refreshToken) {
          sessionStorage.setItem("refreshToken", payload.refreshToken);
        }
        router.push(ROUTES.DASHBOARD);
      } else {
        throw new Error("No access token received");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    router.push(ROUTES.LOGIN);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
    handleLogout,
    sessionExpired,
    setSessionExpired
  };
}

