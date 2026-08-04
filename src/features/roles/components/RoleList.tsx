'use client';

/**
 * Role List Component.
 * Displays a list of roles with management actions.
*/

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Shield, Search, Filter, ShieldCheck, ShieldAlert, Calendar, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useRoleList } from '../hooks/useRoleList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { ROLE_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

export const RoleList: React.FC = () => {
  const { roles, loading, handleDelete } = useRoleList();
  const { language } = useLanguage();
  const strings = ROLE_STRINGS[language];
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <AppLoader message="Loading roles..." />;
  }

  // Calculate stats
  const totalRoles = roles.length;
  // Assume is_active or isActive exists, default to true if undefined for visual
  const activeRoles = roles.filter(r => r.isActive !== false && r.is_active !== false).length;
  const inactiveRoles = totalRoles - activeRoles;
  
  const recentlyAdded = roles.filter(r => {
    if (!r.createdAt) return false;
    const date = new Date(r.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date > thirtyDaysAgo;
  }).length;

  const filteredRoles = roles.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Subtle background gradient mesh */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-100/40 via-purple-50/40 to-transparent rounded-full blur-3xl -z-10 -mr-40 -mt-40"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm border border-orange-100">
             <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{strings.TITLE}</h2>
            <p className="text-sm text-gray-500 mt-1">Manage system roles and permissions</p>
          </div>
        </div>
        
        <Link
          href={ROUTES.ROLE_CREATE}
          className="relative z-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {strings.ADD_ROLE}
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
             <Shield className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Roles</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{totalRoles}</h4>
             <p className="text-[11px] text-gray-400 mt-1">All configured roles</p>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
             <ShieldCheck className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Roles</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{activeRoles}</h4>
             <p className="text-[11px] text-gray-400 mt-1">Currently assigned</p>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
             <ShieldAlert className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inactive Roles</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{inactiveRoles}</h4>
             <p className="text-[11px] text-gray-400 mt-1">Unassigned or disabled</p>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
             <Calendar className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recently Added</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{recentlyAdded}</h4>
             <p className="text-[11px] text-gray-400 mt-1">In last 30 days</p>
           </div>
        </div>
        
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by role name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
           </div>
           
           <div className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                 <div className="flex items-center gap-2">
                   <Filter className="w-4 h-4 text-gray-400" />
                   <span>All Status</span>
                 </div>
                 <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
              </button>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Role <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Created At <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Shield className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium">{strings.NO_ROLES}</p>
                      <p className="text-sm mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role) => {
                  const isActive = role.isActive !== false && role.is_active !== false;
                  return (
                    <tr key={role.id} className="hover:bg-blue-50/30 transition-colors group">
                      {/* Role Name */}
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm shrink-0">
                             {role.name.charAt(0).toUpperCase()}
                           </div>
                           <div>
                             <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{role.name}</p>
                             <p className="text-[11px] text-gray-500 font-medium">ID: {role.id?.substring(0,8) || 'N/A'}</p>
                           </div>
                         </div>
                      </td>
                      
                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isActive
                              ? 'bg-green-50 text-green-700 border border-green-200/60'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                           <Calendar className="w-4 h-4 text-gray-400" />
                           <div className="flex flex-col">
                             <span className="font-medium text-sm">
                               {role.createdAt ? new Date(role.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                             </span>
                           </div>
                        </div>
                      </td>
                      
                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Link
                              href={`/role/${role.id}/edit`}
                              className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 flex items-center justify-center transition-colors"
                              title="Edit Role"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => role.id && handleDelete(role.id)}
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-colors"
                              title="Delete Role"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
           <p className="text-sm text-gray-500 font-medium">
             Showing 1 to {filteredRoles.length} of {filteredRoles.length} roles
           </p>
           
           <div className="flex items-center gap-1">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50">
               <ChevronLeft className="w-4 h-4" />
             </button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium text-sm shadow-sm hover:bg-blue-700 transition-colors">
               1
             </button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50">
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
