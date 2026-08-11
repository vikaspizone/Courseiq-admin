/**
 * Permission List Hook.
 * Custom hook for fetching and managing the permission list.
 */

import { useState, useEffect } from 'react';
import { Permission } from '../types';
import { getPermissions, deletePermission } from '../api';

export function usePermissionList(fetchAll: boolean = false) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchPermissions = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const data = await getPermissions(currentPage, fetchAll ? 500 : 10);
      setPermissions(data.items || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch permissions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchPermissions(page));
  }, [page]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      await deletePermission(id);
      Promise.resolve().then(() => fetchPermissions(page));
    }
  };

  return { permissions, loading, handleDelete, page, setPage, pagination };
}
