/**
 * Course Categories Edit Page.
 * Next.js page component for editing a course category.
 */
import React from 'react';
import { CourseCategoryDetailsView } from '@/features/course_categories/screen/CourseCategoryDetailsView';

export const metadata = {
  title: 'View CourseCategory | Dashboard',
};

export default function ViewCourseCategoryPage() {
  return <CourseCategoryDetailsView />;
}
