'use client';

/**
 * Course Category Details Component.
 */

import React from 'react';
import Link from 'next/link';
import { CourseCategory } from '../types';
import { ROUTES } from '@/features/common/constants/routes';
import { ArrowLeft, Pencil, FolderOpen, Tag, CheckCircle, ShieldAlert, FileText, Component, Fingerprint, Calendar, User as UserIcon } from 'lucide-react';
import { getTranslationData } from '@/features/common/utils/getTranslationData';

interface Props {
  data: CourseCategory;
}

export const CourseCategoryDetails: React.FC<Props> = ({ data }) => {
  const title = getTranslationData(data, 'title') || data.title || 'Untitled Category';
  const description = getTranslationData(data, 'description') || data.description || 'No description provided.';
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
            href={ROUTES.COURSE_CATEGORY}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-3 w-max"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Categories
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Category Details
            </h2>
            <FolderOpen className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Viewing details for <span className="font-semibold text-blue-600">{title}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${ROUTES.COURSE_CATEGORY}/${data.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Category
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="h-32 bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-100 relative">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            </div>
            
            <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 flex justify-center mb-4">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-indigo-50 flex items-center justify-center shadow-md text-indigo-500 relative">
                   <Tag className="w-10 h-10" />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
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
                
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                     <Component className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Hierarchy</p>
                     <p className="text-sm font-semibold text-gray-900">
                       {data.parent_id ? 'Sub-Category' : 'Root Category'}
                     </p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                     <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Created</p>
                     <p className="text-sm font-semibold text-gray-900">{formatDate(data.created_at)}</p>
                   </div>
                </div>
                
                {/* @ts-ignore */}
                {data.updated_at && data.updated_at !== data.created_at && (
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                     <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             {/* Header */}
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-indigo-600 w-max">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-gray-900">Category Information</h3>
                </div>
             </div>

             <div className="p-6 space-y-8">
                <div>
                   <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                     <FileText className="w-4 h-4 text-gray-400" /> Description
                   </h4>
                   <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-wrap">
                     {description}
                   </div>
                </div>
                
                {data.parent_id && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <FolderOpen className="w-4 h-4 text-gray-400" /> Parent Category
                    </h4>
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-center w-full max-w-md">
                      <p className="text-xs font-medium text-gray-500 mb-1">Category Name</p>
                      {/* @ts-ignore */}
                      <p className="text-sm font-semibold text-indigo-700 bg-indigo-50 p-2 rounded border border-indigo-100">
                        {/* @ts-ignore */}
                        {data.parent?.title || data.parent?.name || data.parent_id}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* @ts-ignore */}
                {data.created_by && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <UserIcon className="w-4 h-4 text-gray-400" /> Audit Trail
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                        <p className="text-xs font-medium text-gray-500">Created By (User ID)</p>
                        {/* @ts-ignore */}
                        <p className="text-sm font-mono text-gray-900 mt-1 truncate">{data.created_by}</p>
                      </div>
                      {/* @ts-ignore */}
                      {data.updated_by && (
                        <div className="p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                          <p className="text-xs font-medium text-gray-500">Last Updated By (User ID)</p>
                          {/* @ts-ignore */}
                          <p className="text-sm font-mono text-gray-900 mt-1 truncate">{data.updated_by}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
             </div>
          </div>
          
          {data.translations && data.translations.length > 0 && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="border-b border-gray-100 px-6 pt-6">
                  <div className="flex items-center gap-2 pb-4 border-b-2 border-purple-500 w-max">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <h3 className="text-sm font-bold text-gray-900">Localization Data</h3>
                  </div>
               </div>
               
               <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.translations.map((t, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                          <span className="font-semibold text-gray-900">Language</span>
                          <span className="uppercase font-mono text-xs font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-200">
                            {t.languageCode}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Title</p>
                        <p className="text-sm text-gray-900 font-semibold mb-2">{t.title}</p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Description</p>
                        <p className="text-sm text-gray-700 line-clamp-3" title={t.description}>{t.description || 'N/A'}</p>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

