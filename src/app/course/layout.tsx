/**
 * Course Route Layout.
 */
import React from 'react';
import { Metadata } from 'next';
import { DashboardLayoutWrapper } from '@/features/dashboard/components/DashboardLayoutWrapper';

export const metadata: Metadata = {
  title: 'Course | Admin',
  description: 'Manage Courses',
};

export default function CourseLayout({
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
