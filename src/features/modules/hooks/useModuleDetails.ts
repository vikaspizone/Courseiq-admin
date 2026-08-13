/**
 * Module Details Hook.
 * Custom hook for fetching a single module's details.
 */

import { useState, useEffect } from 'react';
import { Module } from '../types';
import { getModuleById } from '../api';

export function useModuleDetails(id: string) {
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      setLoading(true);
      try {
        const response = await getModuleById(id);
        // @ts-ignore
        setModule(response.data || response || null);
      } catch (error) {
        console.error('Failed to fetch module details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchModule();
    }
  }, [id]);

  return { module, loading };
}
