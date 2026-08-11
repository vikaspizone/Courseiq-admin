/**
 * userApi API.
 * Provides userApi functionality for the feature.
 */

import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { User, UserPayload } from '../types';

export const getUsers = async (page: number = 1, limit: number = 10): Promise<{ items: User[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.USERS}?limit=${limit}&page=${page}`);
  const json = await res.json();
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  return { items: [] };
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetchWithAuth(`${API_ENDPOINTS.USERS}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data || data;
};

export const createUser = async (userData: UserPayload): Promise<User> => {
  const response = await fetchWithAuth(API_ENDPOINTS.USERS, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data.data || data;
};

export const updateUser = async (id: string, userData: Partial<UserPayload>): Promise<User> => {
  const response = await fetchWithAuth(`${API_ENDPOINTS.USERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data.data || data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await fetchWithAuth(`${API_ENDPOINTS.USERS}/${id}`, {
    method: 'DELETE',
  });
};
