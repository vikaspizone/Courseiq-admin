/**
 * Mock API.
 * Provides mock data and simulated API endpoints.
 */

import { User } from '../types';
import { getRoles } from '@/features/roles/api/mockData';

let mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roleId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    roleId: '2',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export const getUsers = async (): Promise<User[]> => {
  const roles = await getRoles();
  return new Promise((resolve) => {
    const populated = mockUsers.map((u) => ({
      ...u,
      roleName: roles.find((r) => r.id === u.roleId)?.name || 'Unknown',
    }));
    setTimeout(() => resolve(populated), 500);
  });
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const roles = await getRoles();
  return new Promise((resolve) => {
    const user = mockUsers.find((u) => u.id === id);
    if (user) {
      user.roleName = roles.find((r) => r.id === user.roleId)?.name || 'Unknown';
    }
    setTimeout(() => resolve(user), 500);
  });
};

export const createUser = (user: Omit<User, 'id' | 'createdAt' | 'roleName'>): Promise<User> => {
  return new Promise((resolve) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
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
