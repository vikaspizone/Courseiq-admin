/**
 * Course List Hook.
 */
import { useState, useEffect } from 'react';
import { Course } from '../types';
import { getCourses, deleteCourse } from '../api';

export const useCourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchCourses = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const response = await getCourses(pageToFetch, 10);
      setCourses(response.items || []);
      setPagination(response.pagination || null);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching courses:', err);
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        fetchCourses(page);
      } catch (err) {
        console.error('Failed to delete course', err);
        alert('Failed to delete course');
      }
    }
  };

  return {
    courses,
    loading,
    error,
    page,
    setPage,
    pagination,
    handleDelete,
    refetch: () => fetchCourses(page)
  };
};
