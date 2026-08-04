'use client';

/**
 * UserDetails Component.
 * Provides UserDetails functionality for the feature.
 */

import React from 'react';
import Link from 'next/link';
import { User } from '../types';
import { ArrowLeft, Pencil, User as UserIcon, Mail, Shield, Settings, Phone, FileText, Calendar, Briefcase, GraduationCap, MapPin, Globe, Users, MoreVertical, ShieldCheck, Lock, Verified, Clock, Fingerprint } from 'lucide-react';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface UserDetailsProps {
  user: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  return (
    <div className="w-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <Link
            href={ROUTES.USER}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-3 w-max"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {strings.BACK_TO_USERS}
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {strings.DETAILS_TITLE}
            </h2>
            <Verified className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Detailed information and system access for <span className="font-semibold text-blue-600">{user.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors bg-white">
            <MoreVertical className="w-5 h-5" />
          </button>
          <Link
            href={`/user/${user.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            {strings.EDIT_TITLE}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Sidebar (Profile Card & About) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Profile Overview Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            {/* Gradient Top */}
            <div className="h-32 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative">
               {/* decorative pattern */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="px-6 pb-6 relative">
              {/* Profile Avatar */}
              <div className="relative -mt-16 flex justify-center mb-4">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center shadow-md relative">
                   {user.profile_image ? (
                      <img src={user.profile_image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                   ) : (
                      <UserIcon className="w-16 h-16 text-blue-500" />
                   )}
                   {/* Status Indicator */}
                   <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-white ${user.is_active || user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                <div className="inline-flex items-center justify-center px-3 py-1 mt-2 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                  {user.role?.name || 'No Role'}
                </div>
              </div>

              {/* Stats / Info List */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                     <Fingerprint className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500">User ID</p>
                     <p className="text-sm font-semibold text-gray-900">USR-{user.id?.substring(0, 6) || '000012'}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                     <Shield className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500">Account Status</p>
                     <div className="mt-1">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          user.is_active || user.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                         {user.is_active || user.isActive ? strings.STATUS_ACTIVE : strings.STATUS_INACTIVE}
                       </span>
                     </div>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                     <Clock className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500">{strings.LAST_LOGIN}</p>
                     <p className="text-sm font-semibold text-gray-900">{strings.NEVER}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                     <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500">{strings.LABEL_CREATED}</p>
                     <p className="text-sm font-semibold text-gray-900">
                       {new Date(user.createdAt || new Date()).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; {new Date(user.createdAt || new Date()).toLocaleTimeString('en-US')}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Card */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-purple-100 border border-indigo-100/50 shadow-sm relative overflow-hidden">
             <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-bold text-indigo-900">About</h4>
             </div>
             <p className="text-sm text-indigo-800/80 relative z-10">
               {user.about || "No additional details provided."}
             </p>
             {/* Decorative Document Icon */}
             <FileText className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-200/40 transform -rotate-12" />
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
             {/* Tabs Header */}
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-blue-600 w-max">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-gray-900">User Information</h3>
                </div>
             </div>

             <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Field Cards */}
                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                       <UserIcon className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_NAME}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">{user.name}</p>
                     </div>
                  </div>

                   <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                       <Mail className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_EMAIL}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">{user.email}</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                       <Shield className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_ROLE}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">{user.role?.name || 'N/A'}</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                       <Settings className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">Status</p>
                       <div className="mt-1">
                         <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            user.is_active || user.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-50 text-red-600'
                          }`}>
                           {user.is_active || user.isActive ? 'Active' : 'Inactive'}
                         </span>
                       </div>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                       <Phone className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">Phone Number</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">{user.phone || 'N/A'}</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                       <Calendar className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">Created At</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {new Date(user.createdAt || new Date()).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &bull; {new Date(user.createdAt || new Date()).toLocaleTimeString('en-US')}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                       <Users className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_GENDER}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5 capitalize">{user.gender || 'N/A'}</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                       <Calendar className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_DOB}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                       <Briefcase className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_EXPERIENCE}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.experience !== undefined ? `${Number(user.experience).toFixed(1)} Years` : 'N/A'}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                       <Globe className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_LANGUAGES}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.languages && user.languages.length > 0 ? user.languages.join(', ') : 'N/A'}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                       <GraduationCap className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_QUALIFICATION}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.qualification?.degree ? `${user.qualification.degree} (${user.qualification.year})` : 'N/A'}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 shrink-0">
                       <MapPin className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_ADDRESS}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.address?.city || user.address?.country ? `${user.address.city || ''}${user.address.city && user.address.country ? ', ' : ''}${user.address.country || ''}` : 'N/A'}
                       </p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow bg-white">
                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                       <Briefcase className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">{strings.LABEL_WORK_EXPERIENCE}</p>
                       <p className="text-sm font-semibold text-gray-900 mt-0.5">
                         {user.work?.title || user.work?.company ? `${user.work.title || ''}${user.work.title && user.work.company ? ' at ' : ''}${user.work.company || ''}` : 'N/A'}
                       </p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
          
          {/* System Access Card (Bottom right) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
             <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-sm font-bold text-gray-900 mb-1">System Access</h3>
                   <p className="text-xs text-gray-500">This user currently has limited access.<br/>You can update role and permissions to manage access.</p>
                </div>
             </div>
             
             <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition-colors rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-2">
                   <Lock className="w-4 h-4" />
                   {strings.MANAGE_ACCESS}
                </button>
             </div>
          </div>
          
          {/* Security Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                   <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <p className="text-xs font-medium text-gray-500">{strings.ACCESS_LEVEL}</p>
                   <p className="text-sm font-bold text-gray-900">{strings.LIMITED}</p>
                   <div className="w-full bg-purple-100 h-1.5 rounded-full mt-2 overflow-hidden">
                     <div className="bg-purple-500 h-full w-1/3 rounded-full"></div>
                   </div>
                </div>
             </div>

             <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                   <Lock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <p className="text-xs font-medium text-gray-500">{strings.PERMISSIONS}</p>
                   <p className="text-sm font-bold text-gray-900">3</p>
                   <div className="w-full bg-orange-100 h-1.5 rounded-full mt-2 overflow-hidden">
                     <div className="bg-orange-500 h-full w-1/4 rounded-full"></div>
                   </div>
                </div>
             </div>

             <div className="bg-green-50/50 border border-green-100 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                   <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <p className="text-xs font-medium text-gray-500">{strings.TWO_FACTOR_AUTH}</p>
                   <p className="text-sm font-bold text-gray-900">{strings.DISABLED}</p>
                   <div className="w-full bg-green-100 h-1.5 rounded-full mt-2 overflow-hidden">
                     <div className="bg-green-500 h-full w-1/5 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
