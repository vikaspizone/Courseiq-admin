/**
 * User List Hook.
 * Custom hook for fetching and managing the user list.
 */

import { useState, useEffect } from 'react';
import { User } from '../types';
import { getUsers, deleteUser } from '../api/mockData';

export function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return { users, loading, handleDelete };
}
