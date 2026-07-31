/**
 * Permission List Hook.
 * Custom hook for fetching and managing the permission list.
 */

import { useState, useEffect } from 'react';
import { Permission } from '../types';
import { getPermissions, deletePermission } from '../api/mockData';

export function usePermissionList() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Failed to fetch permissions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      await deletePermission(id);
      fetchPermissions();
    }
  };

  return { permissions, loading, handleDelete };
}
