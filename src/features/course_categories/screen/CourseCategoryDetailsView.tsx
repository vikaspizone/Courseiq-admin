'use client';

/**
 * Course Category Details View.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CourseCategoryDetails } from '../components/CourseCategoryDetails';
import { CourseCategory } from '../types';
import { getCourseCategoryById } from '../api';

export const CourseCategoryDetailsView: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<CourseCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getCourseCategoryById(id);
        setData(response.data || response);
      } catch (error) {
        console.error('Failed to load details', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-500">Not found.</div>;
  }

  return (
    <div className="w-full">
      <CourseCategoryDetails data={data} />
    </div>
  );
};


