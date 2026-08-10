'use client';

/**
 * Module List Component.
 * Displays a list of modules with management actions.
*/

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, GripVertical } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useModuleList } from '../hooks/useModuleList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { MODULE_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';
import { PermissionGuard } from '@/features/auth/components/PermissionGuard';
import { useAuth } from '@/features/auth/contexts/AuthContext';

export const ModuleList: React.FC = () => {
  const { 
    modules, 
    loading, 
    handleDelete, 
    handleToggleActive, 
    moveModuleLocally, 
    saveModuleOrder,
    draggedIndex,
    setDraggedIndex
  } = useModuleList();
  const { language } = useLanguage();
  const strings = MODULE_STRINGS[language];
  
  // Find the module module to get its ID
  const currentModule = modules.find(m => 
    m.name?.toLowerCase().includes('module') || 
    m.route === '/module'
  );
  const moduleId = currentModule?.id || '';
  const { hasPermission } = useAuth();
  
  const hasActionPermission = hasPermission(moduleId, 'edit') || hasPermission(moduleId, 'delete');

  if (loading) {
    return <AppLoader message="Loading modules..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{strings.TITLE}</h2>
          <p className="text-sm text-gray-500 mt-1">{strings.DESC}</p>
        </div>
        <PermissionGuard moduleId={moduleId} action="create">
          <Link
            href={ROUTES.MODULE_CREATE}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {strings.ADD_MODULE}
          </Link>
        </PermissionGuard>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-10"></th>
                <th className="px-6 py-4">{strings.TH_NAME}</th>
                <th className="px-6 py-4">{strings.TH_STATUS}</th>
                <th className="px-6 py-4">{strings.TH_ROUTE}</th>
                <th className="px-6 py-4">{strings.TH_CREATED}</th>
                {hasActionPermission && <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {modules.length === 0 ? (
                <tr>
                  <td colSpan={hasActionPermission ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_MODULES}
                  </td>
                </tr>
              ) : (
                modules.map((module, index) => (
                  <tr 
                    key={module.id} 
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move';
                      setDraggedIndex(index);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDragEnter={(e) => {
                      if (draggedIndex !== null && draggedIndex !== index) {
                        moveModuleLocally(draggedIndex, index);
                        setDraggedIndex(index);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                    }}
                    onDragEnd={() => {
                      setDraggedIndex(null);
                      saveModuleOrder();
                    }}
                    className={`hover:bg-gray-50/50 transition-colors ${draggedIndex === index ? 'opacity-50' : ''}`}
                  >
                    <td className="px-6 py-4 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {module.translations?.find(t => t.languageCode === language)?.name || module.translations?.[0]?.name || module.name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(module)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${module.is_active ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${module.is_active ? 'translate-x-4' : 'translate-x-1'}`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {module.route ? (
                        <span className="inline-flex text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-mono font-medium border border-green-200 shadow-sm">
                          {module.route}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(module.created_at).toLocaleDateString()}
                    </td>
                    {hasActionPermission && (
                      <td className="px-6 py-4 text-right space-x-1">
                        <PermissionGuard moduleId={moduleId} action="edit">
                          <Link
                            href={`/module/${module.id}/edit`}
                            className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-2"
                            title="Edit Module"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </PermissionGuard>
                        <PermissionGuard moduleId={moduleId} action="delete">
                          <button
                            onClick={() => handleDelete(module.id)}
                            className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Module"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </PermissionGuard>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

