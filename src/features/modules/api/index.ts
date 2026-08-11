/**
 * module API.
 * Provides module api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/features/common/constants/apiEndpoints';
import { Module, ModulePayload } from '../types';

export const getModules = async (page: number = 1, limit: number = 10): Promise<{ items: Module[], pagination?: any }> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.MODULES}?limit=${limit}&page=${page}`);
  const json = await res.json();
  
  if (Array.isArray(json)) return { items: json };
  if (Array.isArray(json.data)) return { items: json.data, pagination: json.pagination };
  if (json.data && Array.isArray(json.data.data)) return { items: json.data.data, pagination: json.data.pagination };
  if (json.data && Array.isArray(json.data.items)) return { items: json.data.items, pagination: json.data.pagination };
  
  return { items: [] };
};

export const getModuleById = async (id: string): Promise<Module | null> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.MODULES}/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createModule = async (payload: ModulePayload):
 Promise<any> => {
  const res = await fetchWithAuth(API_ENDPOINTS.MODULES, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateModule = async (id: string, payload: Partial<ModulePayload>): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.MODULES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteModule = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`${API_ENDPOINTS.MODULES}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
