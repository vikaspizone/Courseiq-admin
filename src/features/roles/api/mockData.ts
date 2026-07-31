/**
 * Mock API.
 * Provides mock data and simulated API endpoints.
 */

import { Role } from '../types';

export let mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to the system.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Instructor',
    description: 'Can manage courses and students.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Student',
    description: 'Can view and take courses.',
    createdAt: new Date().toISOString(),
  },
];

export const getRoles = (): Promise<Role[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockRoles]), 500));
};

export const getRoleById = (id: string): Promise<Role | undefined> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRoles.find((r) => r.id === id)), 500));
};

export const createRole = (role: Omit<Role, 'id' | 'createdAt'>): Promise<Role> => {
  return new Promise((resolve) => {
    const newRole: Role = {
      ...role,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockRoles.push(newRole);
    setTimeout(() => resolve(newRole), 500);
  });
};

export const updateRole = (id: string, roleData: Partial<Role>): Promise<Role> => {
  return new Promise((resolve, reject) => {
    const index = mockRoles.findIndex((r) => r.id === id);
    if (index === -1) return reject(new Error('Role not found'));
    mockRoles[index] = { ...mockRoles[index], ...roleData };
    setTimeout(() => resolve(mockRoles[index]), 500);
  });
};

export const deleteRole = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    mockRoles = mockRoles.filter((r) => r.id !== id);
    setTimeout(() => resolve(), 500);
  });
};
