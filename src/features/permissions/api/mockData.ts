/**
 * Mock Data for Permissions.
 * Simulates API calls for permission management.
 */

import { Permission } from '../types';

let mockPermissions: Permission[] = [
  { id: '1', name: 'Manage Users', description: 'Can add, edit, and delete users', created_at: '2026-01-15T10:00:00Z' },
  { id: '2', name: 'Manage Roles', description: 'Can add, edit, and delete roles', created_at: '2026-02-20T14:30:00Z' },
  { id: '3', name: 'View Reports', description: 'Can view analytics and reports', created_at: '2026-03-05T09:15:00Z' },
];

export const getPermissions = async (): Promise<Permission[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockPermissions]), 500));
};

export const getPermissionById = async (id: string): Promise<Permission | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPermissions.find(p => p.id === id));
    }, 500);
  });
};

export const createPermission = async (data: Omit<Permission, 'id' | 'created_at'>): Promise<Permission> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPermission: Permission = {
        ...data,
        id: Math.random().toString(36).substring(7),
        created_at: new Date().toISOString(),
      };
      mockPermissions.push(newPermission);
      resolve(newPermission);
    }, 500);
  });
};

export const updatePermission = async (id: string, data: Partial<Permission>): Promise<Permission> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockPermissions.findIndex(p => p.id === id);
      if (index > -1) {
        mockPermissions[index] = { ...mockPermissions[index], ...data };
        resolve(mockPermissions[index]);
      } else {
        reject(new Error('Permission not found'));
      }
    }, 500);
  });
};

export const deletePermission = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockPermissions = mockPermissions.filter(p => p.id !== id);
      resolve();
    }, 500);
  });
};
