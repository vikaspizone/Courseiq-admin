/**
 * roleApi API.
 * Provides roleApi functionality for the feature.
 */

import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { Role } from '../types';

export const getRoles = async (page: number = 1, limit: number = 10): Promise<{ items: Role[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.ROLES}?limit=${limit}&page=${page}`);
  const json = await res.json();
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  return { items: [] };
};

export const getRoleById = async (id: string): Promise<Role> => {
  const response = await fetchWithAuth(`${API_ENDPOINTS.ROLES}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data || data;
};

export const createRole = async (roleData: Omit<Role, 'id' | 'created_at'>): Promise<Role> => {
  const response = await fetchWithAuth(API_ENDPOINTS.ROLES, {
    method: 'POST',
    body: JSON.stringify(roleData),
  });
  const data = await response.json();
  return data.data || data;
};

export const updateRole = async (id: string, roleData: Partial<Role>): Promise<Role> => {
  const response = await fetchWithAuth(`${API_ENDPOINTS.ROLES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(roleData),
  });
  const data = await response.json();
  return data.data || data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await fetchWithAuth(`${API_ENDPOINTS.ROLES}/${id}`, {
    method: 'DELETE',
  });
};
