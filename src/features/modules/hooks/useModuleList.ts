/**
 * Module List Hook.
 * Custom hook for fetching and managing the module list.
 */

import { useState, useEffect } from 'react';
import { Module, ModulePayload } from '../types';
import { getModules, deleteModule, updateModule } from '../api';

export function useModuleList() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const data = await getModules();
      setModules(data);
    } catch (error) {
      console.error('Failed to fetch modules', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchModules());

    const handleUpdate = () => fetchModules();
    window.addEventListener('modulesUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('modulesUpdated', handleUpdate);
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      await deleteModule(id);
      window.dispatchEvent(new Event('modulesUpdated'));
    }
  };

  const handleToggleActive = async (module: Module) => {
    try {
      const payload: Partial<ModulePayload> = {
        is_active: !module.is_active
      };
      
      setModules(prev => prev.map(m => m.id === module.id ? { ...m, is_active: !m.is_active } : m));
      await updateModule(module.id, payload);
      window.dispatchEvent(new Event('modulesUpdated'));
    } catch (error) {
      console.error('Failed to toggle active status', error);
      fetchModules();
    }
  };

  return { modules, loading, handleDelete, handleToggleActive, fetchModules };
}
