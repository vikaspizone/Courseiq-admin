/**
 * Course Management API Endpoints.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { Course, CoursePayload } from '../types';

export const getCourses = async (page: number = 1, limit: number = 10): Promise<{ items: Course[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE}?limit=${limit}&page=${page}`);
  const json = await res.json();
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  return { items: [] };
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE}/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createCourse = async (payload: CoursePayload): Promise<any> => {
  const res = await fetchWithAuth(API_ENDPOINTS.COURSE, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateCourse = async (id: string, payload: Partial<CoursePayload>): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteCourse = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.COURSE}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
