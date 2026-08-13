'use client';

/**
 * Module Details Component.
 */

import React from 'react';
import Link from 'next/link';
import { Module } from '../types';
import { ROUTES } from '@/features/common/constants/routes';
import { ArrowLeft, Pencil, Layout, Link as LinkIcon, Component, Compass, Grid3X3, Hash, Calendar, Clock, Fingerprint, Layers } from 'lucide-react';

interface Props {
  data: Module;
}

export const ModuleDetails: React.FC<Props> = ({ data }) => {
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
            href={ROUTES.MODULE}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-3 w-max"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Modules
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Module Details
            </h2>
            <Layout className="w-6 h-6 text-pink-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Viewing details for <span className="font-semibold text-blue-600">{data.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${ROUTES.MODULE}/${data.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Module
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="h-32 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 relative">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ec4899 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 flex justify-center mb-4">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-pink-50 flex items-center justify-center shadow-md text-pink-500 relative">
                   <Layout className="w-10 h-10" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{data.name}</h3>
                <div className="mt-2 text-sm text-gray-500">
                  Routing path configured in system
                </div>
              </div>

              {/* Stats / Info List */}
              <div className="space-y-4">
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                     <Hash className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Sequence</p>
                     <p className="text-sm font-semibold text-gray-900">{data.sort_order || '0'}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                     <Layers className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Hierarchy</p>
                     <p className="text-sm font-semibold text-gray-900">{data.parent_id ? 'Sub-Module' : 'Root Module'}</p>
                   </div>
                </div>

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
                <div className="flex items-center gap-2 pb-4 border-b-2 border-pink-500 w-max">
                  <Grid3X3 className="w-5 h-5 text-pink-500" />
                  <h3 className="text-sm font-bold text-gray-900">Module Configuration</h3>
                </div>
             </div>

             <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                       <LinkIcon className="w-4 h-4 text-blue-500" />
                       <h4 className="text-sm font-bold text-gray-700">Frontend Route</h4>
                    </div>
                    <p className="text-sm font-mono text-gray-900 bg-white p-2 rounded border border-gray-200 w-max">{data.route || 'No Route'}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                       <Compass className="w-4 h-4 text-purple-500" />
                       <h4 className="text-sm font-bold text-gray-700">Icon System Name</h4>
                    </div>
                    <p className="text-sm text-gray-900 font-mono break-all">{data.icon || 'Default'}</p>
                  </div>
                  
                  {data.parent_id && (
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center sm:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                         <Component className="w-4 h-4 text-indigo-500" />
                         <h4 className="text-sm font-bold text-gray-700">Parent Module Mapping</h4>
                      </div>
                      <p className="text-sm text-indigo-700 font-semibold bg-indigo-50 p-2 border border-indigo-100 rounded break-all">
                        {/* @ts-ignore */}
                        {data.parent?.name || data.parent?.title || data.parent_id}
                      </p>
                    </div>
                  )}
                  
                  {/* @ts-ignore */}
                  {data.status && (
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                         <Layers className="w-4 h-4 text-emerald-500" />
                         <h4 className="text-sm font-bold text-gray-700">Status</h4>
                      </div>
                      {/* @ts-ignore */}
                      <p className="text-sm text-gray-900 font-mono break-all">{data.status}</p>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

