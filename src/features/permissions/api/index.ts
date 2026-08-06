/**
 * permission API.
 * Provides permission api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { Permission, PermissionPayload } from '../types';

export const getPermissions = async (): Promise<Permission[]> => {
  const res = await fetchWithAuth('/permissions');
  const json = await res.json();
  return json.data || [];
};

export const getPermissionById = async (id: string): Promise<Permission | null> => {
  const res = await fetchWithAuth(`/permissions/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createPermission = async (payload: PermissionPayload): Promise<any> => {
  const res = await fetchWithAuth('/permissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updatePermission = async (id: string, payload: PermissionPayload): Promise<any> => {
  const res = await fetchWithAuth(`/permissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deletePermission = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`/permissions/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
