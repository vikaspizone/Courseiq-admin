/**
 * Favorite List Hook.
 */
import { useState, useEffect } from 'react';
import { getFavoriteCourses, removeFavoriteCourse } from '../api';

export function useCourseFav(courseId?: string | null) {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await getFavoriteCourses();
        let favs = response?.data?.items || response?.data || response || [];
        if (!Array.isArray(favs)) {
          favs = [favs];
        }
        
        // If courseId is provided and we got multiple results back, optionally filter
        if (courseId && favs.length > 1) {
          favs = favs.filter((f: any) => f.id === courseId || f.courseId === courseId || f.course?.id === courseId);
        }
        setFavorites(favs);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [courseId]);

  const handleRemoveFavorite = async (cid: string) => {
    try {
      await removeFavoriteCourse(cid);
      setFavorites(prev => prev.filter(f => (f.courseId || f.course?.id || f.id) !== cid));
      return true;
    } catch (err) {
      console.error('Failed to remove favorite:', err);
      return false;
    }
  };

  return { favorites, loading, handleRemoveFavorite };
}
