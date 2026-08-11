/**
 * Course Category Create View.
 * Screen component for creating a new course category.
 */
'use client';

import React from 'react';
import { CourseCategoryForm } from '../components/CourseCategoryForm';

export const CourseCategoryCreateView: React.FC = () => {
  return (
    <div className="p-6 md:p-8 w-full">
      <CourseCategoryForm />
    </div>
  );
};
