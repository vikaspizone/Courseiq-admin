/**
 * User Details Hook.
 * Custom hook for fetching details of a specific user.
 */

import { useState, useEffect } from 'react';
import { User } from '../types';
import { getUserById } from '../api/mockData';

export function useUserDetails(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getUserById(id);
        if (data) setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading };
}
