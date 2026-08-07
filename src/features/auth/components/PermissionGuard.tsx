"use client";

/**
 * PermissionGuard Component.
 * Conditionally renders children based on the user's module permissions.
 */
import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface PermissionGuardProps {
  moduleId: string;
  action: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({ moduleId, action, children, fallback = null }: PermissionGuardProps) {
  const { hasPermission, loading } = useAuth();

  if (loading) {
    return null; // Or a small skeleton/spinner if needed
  }

  if (hasPermission(moduleId, action)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
