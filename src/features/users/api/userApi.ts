/**
 * userApi API.
 * Provides userApi functionality for the feature.
 */

import { fetchWithAuth } from '@/lib/apiClient';
import { User, UserPayload } from '../types';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetchWithAuth('/users', {
    method: 'GET',
  });
  const data = await response.json();
  // Assuming the API might wrap the array in a data object or return it directly
  return data.data || data || [];
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetchWithAuth(`/users/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.data || data;
};

export const createUser = async (userData: UserPayload): Promise<User> => {
  const response = await fetchWithAuth('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data.data || data;
};

export const updateUser = async (id: string, userData: Partial<UserPayload>): Promise<User> => {
  const response = await fetchWithAuth(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data.data || data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await fetchWithAuth(`/users/${id}`, {
    method: 'DELETE',
  });
};
