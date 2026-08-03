'use client';

/**
 * User List Component.
 * Displays a list of users with management actions.
*/

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useUserList } from '../hooks/useUserList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

export const UserList: React.FC = () => {
  const { users, loading, handleDelete } = useUserList();
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  if (loading) {
    return <AppLoader message="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{strings.TITLE}</h2>
          <p className="text-sm text-gray-500 mt-1">{strings.DESC}</p>
        </div>
        <Link
          href={ROUTES.USER_CREATE}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {strings.ADD_USER}
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_NAME}</th>
                <th className="px-6 py-4">{strings.TH_EMAIL}</th>
                <th className="px-6 py-4">{strings.TH_ROLE}</th>
                <th className="px-6 py-4">{strings.TH_STATUS}</th>
                <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_USERS}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.roleName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/user/${user.id}`}
                        className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View User"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/user/${user.id}/edit`}
                        className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit User"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="inline-flex p-2 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete User"
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

