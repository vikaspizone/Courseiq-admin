/**
 * Role Permission API.
 * Provides Role Permission Api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { RolePermission, RolePermissionPayload } from '../types';

export const getRolePermissions = async (): Promise<RolePermission[]> => {
  const res = await fetchWithAuth('/role-permissions');
  const json = await res.json();
  return json.data || [];
};

export const getRolePermissionById = async (id: string): Promise<RolePermission | null> => {
  const res = await fetchWithAuth(`/role-permissions/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createRolePermission = async (payload: RolePermissionPayload): Promise<RolePermission> => {
  const res = await fetchWithAuth('/role-permissions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json.data || json;
};

export const updateRolePermission = async (id: string, payload: RolePermissionPayload): Promise<RolePermission> => {
  const res = await fetchWithAuth(`/role-permissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json.data || json;
};

export const deleteRolePermission = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`/role-permissions/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
