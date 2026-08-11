/**
 * Course Categories Edit Page.
 * Next.js page component for editing a course category.
 */
import React from 'react';
import { CourseCategoryEditView } from '@/features/course_categories/screen/CourseCategoryEditView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCourseCategoryPage({ params }: PageProps) {
  const { id } = await params;
  return <CourseCategoryEditView />;
}
