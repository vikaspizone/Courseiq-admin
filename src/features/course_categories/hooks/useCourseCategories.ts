/**
 * Course Categories Hook.
 * Custom React hook for managing course categories state and side effects.
 */
import { useState, useEffect } from 'react';
import { CourseCategory } from '../types';
import { getCourseCategories, deleteCourseCategory } from '../api';

export const useCourseCategories = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchCategories = async (currentPage: number = page) => {
    try {
      setLoading(true);
      const data = await getCourseCategories(currentPage, 10);
      setCategories(data.items || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch course categories', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCourseCategory(id);
        await fetchCategories();
      } catch (error) {
        console.error('Failed to delete category', error);
      }
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  return { categories, loading, handleDelete, refresh: fetchCategories, page, setPage, pagination };
};
