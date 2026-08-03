/**
 * Role List Hook.
 * Custom hook for fetching and managing the role list.
 */

import { useState, useEffect } from 'react';
import { Role } from '../types';
import { getRoles, deleteRole } from '../api/mockData';

export function useRoleList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchRoles());
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      await deleteRole(id);
      Promise.resolve().then(() => fetchRoles());
    }
  };

  return { roles, loading, handleDelete };
}
