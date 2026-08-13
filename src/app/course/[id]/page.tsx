/**
 * Course Details Page.
 */
import React from 'react';
import { CourseDetailsView } from '@/features/course/screen/CourseDetailsView';

export const metadata = {
  title: 'View Course | Dashboard',
};

export default function ViewCoursePage() {
  return <CourseDetailsView />;
}
