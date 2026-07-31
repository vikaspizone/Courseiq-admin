'use client';

/**
 * User Details Component.
 * Displays detailed information about a user.
 */

import React from 'react';
import Link from 'next/link';
import { User } from '../types';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';

interface UserDetailsProps {
  user: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Link
            href="/user"
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{strings.DETAILS_TITLE}</h2>
            <p className="text-sm text-gray-500 mt-1">{user.name}</p>
          </div>
        </div>
        <Link
          href={`/user/${user.id}/edit`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and system access.</p>
        </div>
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.roleName || 'N/A'}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.status}
                </span>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900">{new Date(user.createdAt).toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
