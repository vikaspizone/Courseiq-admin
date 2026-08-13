'use client';

/**
 * Course Details View.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CourseDetails } from '../components/CourseDetails';
import { Course } from '../types';
import { getCourseById } from '../api';
import { COURSE_STRINGS } from '../constants';

export const CourseDetailsView: React.FC = () => {
  const strings = COURSE_STRINGS['en'];
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getCourseById(id);
        setData((response as any)?.data || response);
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
    return <div className="p-8 text-center text-gray-500">{strings.NOT_FOUND}</div>;
  }

  return (
    <div className="w-full">
      <CourseDetails data={data} />
    </div>
  );
};


