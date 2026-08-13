import { useState, useEffect } from 'react';
import { getCourseById } from '../api';
import { Course } from '../types';

export const useCourseDetails = (id: string) => {
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

  return { data, loading };
};
