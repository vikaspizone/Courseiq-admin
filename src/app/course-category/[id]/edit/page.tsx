/**
 * Course Category Edit Page.
 */
import React from 'react';
import { CourseCategoryEditView } from '@/features/course_categories/screen/CourseCategoryEditView';

export const metadata = {
  title: 'Edit Course Category | Dashboard',
};

export default function EditCourseCategoryPage() {
  return <CourseCategoryEditView />;
}
