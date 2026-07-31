/**
 * Layout Component for Permissions.
 * Next.js layout component for the route.
 */

import React from 'react';
import { DashboardLayoutWrapper } from '@/features/dashboard/components/DashboardLayoutWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}
