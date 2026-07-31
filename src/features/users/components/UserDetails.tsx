'use client';

/**
 * User Details Component.
 * Displays detailed information about a user.
 */

import React from 'react';
import Link from 'next/link';
import { User } from '../types';
import { ArrowLeft, Pencil, User as UserIcon, Mail, Shield, Settings, Phone, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';

interface UserDetailsProps {
  user: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/user"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {strings.BACK_TO_USERS}
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
            {strings.DETAILS_TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {strings.DETAILS_DESC} {user.name}.
          </p>
        </div>
        <Link
          href={`/user/${user.id}/edit`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
        >
          <Pencil className="w-4 h-4 mr-2" />
          {strings.EDIT_TITLE}
        </Link>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Profile Image Section */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="text-sm font-medium text-gray-700 text-center mb-4 bg-white relative z-10 w-max mx-auto px-2">{strings.PROFILE_IMAGE}</div>
            <div className="border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50 -mt-6 pt-10">
              <div className="relative mb-4 mt-2">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-blue-500" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.roleName || strings.NO_ROLE}</p>
            </div>
          </div>

          {/* User Information Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <UserIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">{strings.USER_INFO}</h3>
              <div className="flex-1 h-px bg-gray-100 ml-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Full Name */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <UserIcon className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_NAME}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {user.name}
                   </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Mail className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_EMAIL}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {user.email}
                   </p>
                </div>
              </div>

              {/* Role */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Shield className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_ROLE}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {user.roleName || 'N/A'}
                   </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Settings className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_STATUS}
                   </label>
                   <div className="mt-1.5">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                       {user.status === 'active' ? strings.STATUS_ACTIVE : strings.STATUS_INACTIVE}
                     </span>
                   </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_PHONE}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {user.phone || 'N/A'}
                   </p>
                </div>
              </div>
              
              {/* Created At */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Calendar className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_CREATED}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {new Date(user.createdAt).toLocaleString()}
                   </p>
                </div>
              </div>

              {/* About */}
              <div className="flex gap-3 items-start col-span-1 md:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <FileText className="text-blue-500 w-5 h-5" />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 block mb-1">
                     {strings.LABEL_ABOUT_VIEW}
                   </label>
                   <p className="text-sm font-medium text-gray-900 mt-2">
                     {user.about || strings.NO_DETAILS}
                   </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
