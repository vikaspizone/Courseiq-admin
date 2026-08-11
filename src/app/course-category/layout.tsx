/**
 * Course Categories Route Layout.
 * Next.js layout component for the course categories route.
 */
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Course Categories | Admin',
  description: 'Manage Course Categories',
};

import { DashboardLayoutWrapper } from '@/features/dashboard/components/DashboardLayoutWrapper';

export default function CourseCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  );
}
