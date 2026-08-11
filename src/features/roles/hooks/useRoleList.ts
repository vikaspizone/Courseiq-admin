/**
 * Role List Hook.
 * Custom hook for fetching and managing the role list.
 */

import { useState, useEffect } from 'react';
import { Role } from '../types';
import { getRoles, deleteRole } from '../api/roleApi';

export function useRoleList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchRoles = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const data = await getRoles(currentPage, 10);
      setRoles(data.items || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchRoles(page));
  }, [page]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      await deleteRole(id);
      Promise.resolve().then(() => fetchRoles(page));
    }
  };

  return { roles, loading, handleDelete, page, setPage, pagination };
}
