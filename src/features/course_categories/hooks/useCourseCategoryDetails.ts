import { useState, useEffect } from 'react';
import { getCourseCategoryById } from '../api';
import { CourseCategory } from '../types';

export const useCourseCategoryDetails = (id: string) => {
  const [data, setData] = useState<CourseCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getCourseCategoryById(id);
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
