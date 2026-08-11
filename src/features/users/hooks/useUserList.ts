'use client';
/**
 * User List Hook.
 * Custom hook for fetching and managing the user list.
 */

import { useState, useEffect } from 'react';
import { User } from '../types';
import { getUsers, deleteUser } from '../api/userApi';

export function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchUsers = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const data = await getUsers(currentPage, 10);
      setUsers(data.items || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchUsers(page));
  }, [page]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      Promise.resolve().then(() => fetchUsers(page));
    }
  };

  return { users, loading, handleDelete, page, setPage, pagination };
}
