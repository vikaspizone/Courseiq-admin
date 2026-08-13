/**
 * Course Create Page.
 */
import React from 'react';
import { CourseCreateView } from '@/features/course/screen/CourseCreateView';

export const metadata = {
  title: 'Create Course | Dashboard',
};

export default function CreateCoursePage() {
  return <CourseCreateView />;
}
