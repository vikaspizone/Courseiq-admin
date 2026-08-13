/**
 * Course Page.
 */
import React from 'react';
import { CourseListView } from '@/features/course/screen/CourseListView';

export const metadata = {
  title: 'Courses | Dashboard',
};

export default function CoursesPage() {
  return <CourseListView />;
}
