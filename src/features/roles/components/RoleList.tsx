'use client';

/**
 * Role List Component.
 * Displays a list of roles with management actions.
 */

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useRoleList } from '../hooks/useRoleList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { ROLE_STRINGS } from '../constants';

export const RoleList: React.FC = () => {
  const { roles, loading, handleDelete } = useRoleList();
  const { language } = useLanguage();
  const strings = ROLE_STRINGS[language];

  if (loading) {
    return <AppLoader message="Loading roles..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{strings.TITLE}</h2>
          <p className="text-sm text-gray-500 mt-1">{strings.DESC}</p>
        </div>
        <Link
          href="/role/create"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {strings.ADD_ROLE}
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_NAME}</th>
                <th className="px-6 py-4">{strings.TH_DESC}</th>
                <th className="px-6 py-4">{strings.TH_CREATED}</th>
                <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_ROLES}
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                    <td className="px-6 py-4 text-gray-500">{role.description}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(role.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/role/${role.id}/edit`}
                        className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit Role"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
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
