/**
 * roleApi API.
 * Provides roleApi functionality for the feature.
 */

import { fetchWithAuth } from '@/lib/apiClient';
import { Role } from '../types';

export const getRoles = async (): Promise<Role[]> => {
  const response = await fetchWithAuth('/roles', {
    method: 'GET',
  });
  const data = await response.json();
  return data.data || data || [];
};

export const getRoleById = async (id: string): Promise<Role> => {
  const response = await fetchWithAuth(`/roles/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data || data;
};

export const createRole = async (roleData: Omit<Role, 'id' | 'createdAt'>): Promise<Role> => {
  const response = await fetchWithAuth('/roles', {
    method: 'POST',
    body: JSON.stringify(roleData),
  });
  const data = await response.json();
  return data.data || data;
};

export const updateRole = async (id: string, roleData: Partial<Role>): Promise<Role> => {
  const response = await fetchWithAuth(`/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(roleData),
  });
  const data = await response.json();
  return data.data || data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await fetchWithAuth(`/roles/${id}`, {
    method: 'DELETE',
  });
};
