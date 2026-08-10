'use client';

/**
 * Permission List Component.
 * Displays a list of permissions with management actions.
*/

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { usePermissionList } from '../hooks/usePermissionList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { PERMISSION_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';
import { useModuleList } from '@/features/modules/hooks/useModuleList';
import { PermissionGuard } from '@/features/auth/components/PermissionGuard';
import { useAuth } from '@/features/auth/contexts/AuthContext';

export const PermissionList: React.FC = () => {
  const { permissions, loading, handleDelete } = usePermissionList();
  const { language } = useLanguage();
  const strings = PERMISSION_STRINGS[language];
  const { hasPermission } = useAuth();
  const { modules } = useModuleList();
  
  // Find the permission module to get its ID
  const currentModule = modules.find(m => 
    m.name.toLowerCase().includes('permission') || 
    m.route === '/permission'
  );
  const moduleId = currentModule?.id || "f514e11a-1b4e-46a0-a71c-a66d92c85a1a";
  const hasActionPermission = hasPermission(moduleId, 'edit') || hasPermission(moduleId, 'delete');

  if (loading) {
    return <AppLoader message="Loading permissions..." />;
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
            href={ROUTES.PERMISSION_CREATE}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {strings.ADD_PERMISSION}
          </Link>
        </PermissionGuard>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_NAME}</th>
                <th className="px-6 py-4">{strings.TH_CREATED}</th>
                {hasActionPermission && <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissions.length === 0 ? (
                <tr>
                  <td colSpan={hasActionPermission ? 3 : 2} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_PERMISSIONS}
                  </td>
                </tr>
              ) : (
                permissions.map((permission) => (
                  <tr key={permission.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{permission.name}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(permission.created_at).toLocaleDateString()}
                    </td>
                    {hasActionPermission && (
                      <td className="px-6 py-4 text-right space-x-2">
                        <PermissionGuard moduleId={moduleId} action="edit">
                          <Link
                            href={`/permission/${permission.id}/edit`}
                            className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit Permission"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </PermissionGuard>
                        <PermissionGuard moduleId={moduleId} action="delete">
                          <button
                            onClick={() => handleDelete(permission.id)}
                            className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Permission"
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

