'use client';

/**
 * Role Details Component.
 */

import React from 'react';
import Link from 'next/link';
import { Role } from '../types';
import { ROUTES } from '@/features/common/constants/routes';
import { ArrowLeft, Pencil, Shield, ShieldCheck, ShieldAlert, CheckCircle, Activity, LayoutList, Calendar, Clock, Lock, Key } from 'lucide-react';

interface Props {
  data: Role;
}

export const RoleDetails: React.FC<Props> = ({ data }) => {
  const isActive = data.is_active;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="w-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <Link
            href={ROUTES.ROLE}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-3 w-max"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Roles
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Role Details
            </h2>
            <Shield className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Viewing details for <span className="font-semibold text-blue-600">{data.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${ROUTES.ROLE}/${data.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Role
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="h-32 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 relative">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 flex justify-center mb-4">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-orange-50 flex items-center justify-center shadow-md text-orange-500 relative">
                   <Shield className="w-10 h-10" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{data.name}</h3>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {isActive ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <ShieldAlert className="w-3.5 h-3.5 mr-1" />}
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Stats / Info List */}
              <div className="space-y-4">
                {data.created_at && (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-colors">
                     <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                       <Calendar className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500 uppercase">Created</p>
                       <p className="text-sm font-semibold text-gray-900">{formatDate(data.created_at)}</p>
                     </div>
                  </div>
                )}
                
                {data.updated_at && data.updated_at !== data.created_at && (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-colors">
                     <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                       <Clock className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500 uppercase">Last Updated</p>
                       <p className="text-sm font-semibold text-gray-900">{formatDate(data.updated_at)}</p>
                     </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
             {/* Header */}
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-orange-500 w-max">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <h3 className="text-sm font-bold text-gray-900">Role Context</h3>
                </div>
             </div>

             <div className="p-6 space-y-8">
                <div>
                   <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                     <LayoutList className="w-4 h-4 text-gray-400" /> Description
                   </h4>
                   <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-wrap">
                     The <span className="font-semibold capitalize">{data.name}</span> role provides access to specific modules and permissions as mapped in the system. Users assigned to this role will inherit all associated permissions.
                   </div>
                </div>
                
                {/* @ts-ignore - Check if role has attached permissions data */}
                {data.permissions && Array.isArray(data.permissions) && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <Lock className="w-4 h-4 text-gray-400" /> Assigned Permissions
                    </h4>
                    {/* @ts-ignore */}
                    {data.permissions.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {/* @ts-ignore */}
                        {data.permissions.map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50">
                            <Key className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-semibold text-gray-700 capitalize">{perm.name || perm}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                        No permissions are explicitly assigned to this role yet.
                      </div>
                    )}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

