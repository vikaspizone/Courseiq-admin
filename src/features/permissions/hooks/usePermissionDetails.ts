/**
 * Permission Details Hook.
 * Custom hook for fetching a single permission's details.
 */

import { useState, useEffect } from 'react';
import { Permission } from '../types';
import { getPermissionById } from '../api/mockData';

export function usePermissionDetails(id: string) {
  const [permission, setPermission] = useState<Permission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermission = async () => {
      setLoading(true);
      try {
        const data = await getPermissionById(id);
        setPermission(data || null);
      } catch (error) {
        console.error('Failed to fetch permission details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPermission();
    }
  }, [id]);

  return { permission, loading };
}
