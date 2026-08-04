/**
 * useUsers Hook.
 * Provides useUsers functionality for the feature.
 */

import { useState, useEffect, useCallback } from 'react';
import { User, UserPayload } from '../types';
import * as userApi from '../api/userApi';

export const useGetUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const users = await userApi.getUsers();
      setData(users);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { data, loading, error, refetch: fetchUsers };
};

export const useGetUserById = (id?: string) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const user = await userApi.getUserById(id);
      setData(user);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { data, loading, error, refetch: fetchUser };
};

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (userData: UserPayload): Promise<User> => {
    setLoading(true);
    try {
      const newUser = await userApi.createUser(userData);
      setError(null);
      return newUser;
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: string, userData: Partial<UserPayload>): Promise<User> => {
    setLoading(true);
    try {
      const updatedUser = await userApi.updateUser(id, userData);
      setError(null);
      return updatedUser;
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await userApi.deleteUser(id);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
