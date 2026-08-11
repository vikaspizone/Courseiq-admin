/**
 * permission API.
 * Provides permission api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { Permission, PermissionPayload } from '../types';

export const getPermissions = async (page: number = 1, limit: number = 10): Promise<{ items: Permission[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.PERMISSIONS}?limit=${limit}&page=${page}`);
  const json = await res.json();
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  return { items: [] };
};

export const getPermissionById = async (id: string): Promise<Permission | null> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.PERMISSIONS}/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createPermission = async (payload: PermissionPayload): Promise<any> => {
  const res = await fetchWithAuth(API_ENDPOINTS.PERMISSIONS, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updatePermission = async (id: string, payload: PermissionPayload): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.PERMISSIONS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deletePermission = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.PERMISSIONS}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
