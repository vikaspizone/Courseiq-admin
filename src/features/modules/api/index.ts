/**
 * module API.
 * Provides module api functionality for the feature.
 */
import { fetchWithAuth } from '@/lib/apiClient';
import { Module, ModulePayload } from '../types';

export const getModules = async (): Promise<Module[]> => {
  const res = await fetchWithAuth('/modules');
  const json = await res.json();
  return json.data || [];
};

export const getModuleById = async (id: string): Promise<Module | null> => {
  const res = await fetchWithAuth(`/modules/${id}`);
  const json = await res.json();
  return json.data || null;
};

export const createModule = async (payload: ModulePayload):
 Promise<any> => {
  const res = await fetchWithAuth('/modules', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateModule = async (id: string, payload: Partial<ModulePayload>): Promise<any> => {
  const res = await fetchWithAuth(`/modules/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const deleteModule = async (id: string): Promise<any> => {
  const res = await fetchWithAuth(`/modules/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
