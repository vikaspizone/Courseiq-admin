'use client';
/**
 * Course Edit View.
 * Screen component for editing an existing course.
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CourseForm } from '../components/CourseForm';
import { getCourseById } from '../api';
import { Course } from '../types';
import { AppLoader } from '@/features/common/components/AppLoader';

export const CourseEditView: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        // @ts-ignore
        setCourse(response.data || response || null);
      } catch (error) {
        console.error('Failed to load course', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCourse();
    }
  }, [id]);

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
