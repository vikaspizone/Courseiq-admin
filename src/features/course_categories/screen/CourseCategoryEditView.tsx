/**
 * Course Category Edit View.
 * Screen component for editing an existing course category.
 */
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CourseCategoryForm } from '../components/CourseCategoryForm';
import { getCourseCategoryById } from '../api';
import { CourseCategory } from '../types';
import { AppLoader } from '@/features/common/components/AppLoader';

export const CourseCategoryEditView: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [category, setCategory] = useState<CourseCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCourseCategoryById(id);
        setCategory(data);
      } catch (error) {
        console.error('Failed to load category', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCategory();
    }
  }, [id]);

  if (loading) {
    return <AppLoader message="Loading category..." />;
  }

  if (!category) {
    return <div className="p-8 text-center text-gray-500">Category not found</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <CourseCategoryForm initialData={category} />
    </div>
  );
};
