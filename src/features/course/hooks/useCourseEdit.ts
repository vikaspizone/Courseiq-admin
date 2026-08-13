import { useState, useEffect } from 'react';
import { getCourseById } from '../api';
import { Course } from '../types';

export const useCourseEdit = (id: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        // @ts-ignore
        setCourse((response as any)?.data || response || null);
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

  return { course, loading };
};
