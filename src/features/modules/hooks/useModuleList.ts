/**
 * Module List Hook.
 * Custom hook for fetching and managing the module list.
 */

import { useState, useEffect } from 'react';
import { Module, ModulePayload } from '../types';
import { getModules, deleteModule, updateModule } from '../api';

export function useModuleList(fetchAll: boolean = false) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const fetchModules = async (currentPage: number = page) => {
    setLoading(true);
    try {
      let data = await getModules(currentPage, fetchAll ? 500 : 10);
      let items = data.items || [];
      if (!Array.isArray(items)) {
        console.warn('API returned non-array for modules, defaulting to empty array', items);
        items = [];
      }
      const sortedData = items.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setModules(sortedData);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch modules', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => fetchModules(page));

    const handleUpdate = () => fetchModules();
    window.addEventListener('modulesUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('modulesUpdated', handleUpdate);
    };
  }, [page]);

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

  const moveModuleLocally = (dragIndex: number, hoverIndex: number) => {
    if (dragIndex === hoverIndex) return;

    setModules((prevModules) => {
      const newModules = [...prevModules];
      const draggedModule = newModules[dragIndex];

      newModules.splice(dragIndex, 1);
      newModules.splice(hoverIndex, 0, draggedModule);

      return newModules.map((mod, index) => ({
        ...mod,
        sort_order: index + 1,
      }));
    });
  };

  const saveModuleOrder = async () => {
    try {
      const promises = modules.map(async (mod) => {
        return updateModule(mod.id, { sort_order: mod.sort_order });
      });
      await Promise.all(promises);
      window.dispatchEvent(new Event('modulesUpdated'));
    } catch (error) {
      console.error('Failed to save module order', error);
      fetchModules();
    }
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  return { 
    modules, 
    loading, 
    handleDelete, 
    handleToggleActive, 
    moveModuleLocally,
    saveModuleOrder,
    draggedIndex,
    setDraggedIndex,
    fetchModules,
    page,
    setPage,
    pagination
  };
}
