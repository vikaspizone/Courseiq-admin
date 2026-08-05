'use client';

/**
 * User List Component.
 * Displays a list of users with management actions.
*/

import React, { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Eye, Users, UserCheck, Shield, Calendar, Search, Filter, Mail, Minus, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useUserList } from '../hooks/useUserList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

export const UserList: React.FC = () => {
  const { users, loading, handleDelete } = useUserList();
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return <AppLoader message="Loading users..." />;
  }

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active || u.is_active).length;
  
  // Safe roles extraction to prevent errors if role object is undefined
  const rolesCount = new Set(users.map(u => u.role_id || u.name).filter(Boolean)).size;

  const recentlyAdded = users.filter(u => {
    if (!u.created_at) return false;
    const date = new Date(u.created_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date > thirtyDaysAgo;
  }).length;

  // Pagination & filtering state could be expanded here. We show dummy pagination for now.
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full pb-10">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Subtle background gradient mesh */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 via-purple-50/40 to-transparent rounded-full blur-3xl -z-10 -mr-40 -mt-40"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
             <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{strings.TITLE}</h2>
            <p className="text-sm text-gray-500 mt-1">Manage platform users and their roles</p>
          </div>
        </div>
        
        <Link
          href={ROUTES.USER_CREATE}
          className="relative z-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {strings.ADD_USER}
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
             <Users className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{totalUsers}</h4>
             <p className="text-[11px] text-gray-400 mt-1">All registered users</p>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
             <UserCheck className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Users</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{activeUsers}</h4>
             <p className="text-[11px] text-gray-400 mt-1">Currently active</p>
           </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
           <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
             <Shield className="w-6 h-6" />
           </div>
           <div>
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Roles</p>
             <h4 className="text-2xl font-bold text-gray-900 mt-0.5">{rolesCount}</h4>
             <p className="text-[11px] text-gray-400 mt-1">Assigned roles</p>
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
                placeholder="Search by name or email..."
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
                    User <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Email <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Status <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                    Joined On <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium">{strings.NO_USERS}</p>
                      <p className="text-sm mt-1">Try adjusting your search filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                    {/* User */}
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                           {user.name.charAt(0).toUpperCase()}
                         </div>
                         <div>
                           <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                           <p className="text-[11px] text-gray-500 font-medium">ID: {user.id?.substring(0,6) || 'N/A'}</p>
                         </div>
                       </div>
                    </td>
                    
                    {/* Email */}
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-gray-600">
                         <Mail className="w-4 h-4 text-blue-400" />
                         <span>{user.email}</span>
                       </div>
                    </td>
                    
                    {/* Role */}
                    <td className="px-6 py-4">
                       {user.role?.name ? (
                         <span className="font-medium text-gray-700">{user.role.name}</span>
                       ) : (
                         <div className="flex flex-col items-start text-gray-400">
                           <div className="bg-gray-100 p-0.5 rounded-full mb-1">
                             <Minus className="w-3 h-3" />
                           </div>
                           <span className="text-[11px]">Not Assigned</span>
                         </div>
                       )}
                    </td>
                    
                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.is_active || user.is_active
                            ? 'bg-green-50 text-green-700 border border-green-200/60'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_active || user.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {user.is_active || user.is_active ? 'Active' : 'Inactive'}

                      </span>
                    </td>

                    {/* Joined On */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                         <Calendar className="w-4 h-4 text-gray-400" />
                         <div className="flex flex-col">
                           <span className="font-medium text-sm">
                             {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                           </span>
                           <span className="text-[11px] text-gray-400">
                             {user.created_at ? new Date(user.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' }) : ''}
                           </span>
                         </div>
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/user/${user.id}`}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-colors"
                            title="View User"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/user/${user.id}/edit`}
                            className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 flex items-center justify-center transition-colors"
                            title="Edit User"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => user.id && handleDelete(user.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
           <p className="text-sm text-gray-500 font-medium">
             Showing 1 to {filteredUsers.length} of {filteredUsers.length} users
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
