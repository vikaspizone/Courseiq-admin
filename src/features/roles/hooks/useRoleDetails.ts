/**
 * Role Details Hook.
 * Custom hook for fetching details of a specific role.
 */

import { useState, useEffect } from 'react';
import { Role } from '../types';
import { getRoleById } from '../api/mockData';

export function useRoleDetails(id: string) {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getRoleById(id);
        if (data) setRole(data);
      } catch (error) {
        console.error('Failed to fetch role details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id]);

  return { role, loading };
}
