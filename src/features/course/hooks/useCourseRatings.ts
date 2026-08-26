/**
 * Rating List Hook.
 */
import { useState, useEffect } from 'react';
import { getCourseRatingsByCourseId } from '../api';

export function useCourseRatings(courseId?: string | null) {
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getCourseRatingsByCourseId(courseId);
        let items = response?.data?.items || response?.data || response || [];
        if (!Array.isArray(items)) items = [items];
        setRatings(items);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [courseId]);

  return { ratings, loading };
}
