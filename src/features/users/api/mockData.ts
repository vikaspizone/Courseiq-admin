/**
 * Mock API.
 * Provides mock data and simulated API endpoints.
 */

import { User } from '../types';
import { getRoles } from '@/features/roles/api/roleApi';

import { Role } from '@/features/roles/types';

let mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role_id: '1',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role_id: '2',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const getUsers = async (): Promise<User[]> => {
  const rolesResponse = await getRoles();
  const roles = rolesResponse.items || [];
  return new Promise((resolve) => {
    const populated = mockUsers.map((u) => ({
      ...u,
      role: roles.find((r: Role) => r.id === u.role_id) || undefined,
    }));
    setTimeout(() => resolve(populated), 500);
  });
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const rolesResponse = await getRoles();
  const roles = rolesResponse.items || [];
  return new Promise((resolve) => {
    const user = mockUsers.find((u) => u.id === id);
    if (user) {
      user.role = roles.find((r: Role) => r.id === user.role_id) || undefined;
    }
    setTimeout(() => resolve(user), 500);
  });
};

export const createUser = (user: Omit<User, 'id' | 'created_at' | 'role'>): Promise<User> => {
  return new Promise((resolve) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    setTimeout(() => resolve(newUser), 500);
  });
};

export const updateUser = (id: string, userData: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return reject(new Error('User not found'));
    mockUsers[index] = { ...mockUsers[index], ...userData };
    setTimeout(() => resolve(mockUsers[index]), 500);
  });
};

export const deleteUser = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    mockUsers = mockUsers.filter((u) => u.id !== id);
    setTimeout(() => resolve(), 500);
  });
};
