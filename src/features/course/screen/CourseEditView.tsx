'use client';
/**
 * Course Edit View.
 * Screen component for editing an existing course.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { CourseForm } from '../components/CourseForm';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useCourseEdit } from '../hooks/useCourseEdit';

export const CourseEditView: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { course, loading } = useCourseEdit(id || '');

  if (loading) {
    return <AppLoader message="Loading course..." />;
  }

  if (!course) {
    return <div className="p-8 text-center text-gray-500">Course not found</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <CourseForm initialData={course} />
    </div>
  );
};
