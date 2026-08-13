/**
 * Course Create View.
 */

import React from 'react';
import { CourseForm } from '../components/CourseForm';

export function CourseCreateView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <CourseForm />
    </div>
  );
}
