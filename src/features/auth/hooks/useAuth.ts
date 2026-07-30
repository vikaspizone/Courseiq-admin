"use client";
/**
 * useAuth hook.
 * Custom hook providing authentication state and methods.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATIC_USERS } from "../constants";

export function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // Find user from static file
      const user = STATIC_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        // In a real app, you'd save a token to cookies/localStorage here
        sessionStorage.setItem("userEmail", user.email);
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 1000);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin
  };
}
