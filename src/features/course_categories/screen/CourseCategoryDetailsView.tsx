'use client';

/**
 * Course Category Details View.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { CourseCategoryDetails } from '../components/CourseCategoryDetails';
import { COURSE_CATEGORY_STRINGS } from '../constants';
import { useCourseCategoryDetails } from '../hooks/useCourseCategoryDetails';

export const CourseCategoryDetailsView: React.FC = () => {
  const strings = COURSE_CATEGORY_STRINGS['en'];
  const params = useParams();
  const id = params?.id as string;
  const { data, loading } = useCourseCategoryDetails(id || "");

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-500">{strings.NOT_FOUND}</div>;
  }

  return (
    <div className="w-full">
      <CourseCategoryDetails data={data} />
    </div>
  );
};


