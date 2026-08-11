/**
 * Course Categories API.
 * Provides API functionality for managing course categories.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { CourseCategory, CourseCategoryPayload } from '../types';

export const getCourseCategories = async (page: number = 1, limit: number = 10): Promise<{ items: CourseCategory[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE_CATEGORIES}?limit=${limit}&page=${page}`);
  const json = await res.json();
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  return { items: [] };
};

export const getCourseCategoryById = async (id: string): Promise<CourseCategory | null> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE_CATEGORIES}/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createCourseCategory = async (payload: CourseCategoryPayload): Promise<any> => {
  const res = await fetchWithAuth(API_ENDPOINTS.COURSE_CATEGORIES, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateCourseCategory = async (id: string, payload: Partial<CourseCategoryPayload>): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE_CATEGORIES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteCourseCategory = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE_CATEGORIES}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
