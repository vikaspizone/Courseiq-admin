/**
 * Role Permission API.
 * Provides Role Permission Api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { RolePermission, RolePermissionPayload } from '../types';

export const getRolePermissions = async (): Promise<RolePermission[]> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.ROLE_PERMISSIONS}?limit=10&page=1`);
  const json = await res.json();
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.data)) return json.data;
  if (json.data && Array.isArray(json.data.data)) return json.data.data;
  if (json.data && Array.isArray(json.data.items)) return json.data.items;
  return [];
};

export const getRolePermissionById = async (id: string): Promise<RolePermission | null> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.ROLE_PERMISSIONS}/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createRolePermission = async (payload: RolePermissionPayload): Promise<RolePermission> => {
  const res = await fetchWithAuth(API_ENDPOINTS.ROLE_PERMISSIONS, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json.data || json;
};

export const updateRolePermission = async (id: string, payload: RolePermissionPayload): Promise<RolePermission> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.ROLE_PERMISSIONS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json.data || json;
};

export const deleteRolePermission = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.ROLE_PERMISSIONS}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
