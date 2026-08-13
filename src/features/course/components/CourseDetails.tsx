'use client';

/**
 * Course Details Component.
 */

import React from 'react';
import Link from 'next/link';
import { Course } from '../types';
import { ROUTES } from '@/features/common/constants/routes';
import { ArrowLeft, Pencil, BookOpen, Clock, Tag, Globe, BarChart, Image as ImageIcon, CheckCircle, ShieldAlert, FileText, LayoutList, Fingerprint, FolderOpen, Calendar, Banknote, Percent, Info } from 'lucide-react';
import { getTranslationData } from '@/features/common/utils/getTranslationData';

interface Props {
  data: Course;
}

export const CourseDetails: React.FC<Props> = ({ data }) => {
  const title = getTranslationData(data, 'title') || 'Untitled Course';
  const description = getTranslationData(data, 'description') || 'No description provided.';
  const overview = getTranslationData(data, 'overview') || 'No overview provided.';
  const isActive = data.status === 'published';
  // @ts-ignore - The API returns price as an object, but type is array sometimes
  const price = data.price || (data.prices?.[0]);
  // @ts-ignore - API returns category as object
  const category = data.category;

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
            href={ROUTES.COURSE}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-3 w-max"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Courses
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Course Details
            </h2>
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Viewing details for <span className="font-semibold text-blue-600">{title}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${ROUTES.COURSE}/${data.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-5 shadow-sm"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Course
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <div className="h-40 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative flex items-center justify-center overflow-hidden">
               {data.thumbnail ? (
                  <img src={data.thumbnail} alt={title} className="w-full h-full object-cover" />
               ) : (
                 <div className="flex flex-col items-center justify-center opacity-50">
                    <ImageIcon className="w-10 h-10 text-indigo-400 mb-2" />
                    <span className="text-sm font-medium text-indigo-500">No Thumbnail</span>
                 </div>
               )}
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">{title}</h3>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                    isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {isActive ? <CheckCircle className="w-3.5 h-3.5 mr-1" /> : <ShieldAlert className="w-3.5 h-3.5 mr-1" />}
                    {data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : 'Unknown'}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                    {data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : 'Unknown'}
                  </span>
                </div>
              </div>

              {/* Stats / Info List */}
              <div className="space-y-4">
                
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                     <Fingerprint className="w-5 h-5" />
                   </div>
                   <div className="overflow-hidden">
                     <p className="text-xs font-medium text-gray-500 uppercase">Slug</p>
                     <p className="text-sm font-semibold text-gray-900 truncate">{data.slug}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                     <FolderOpen className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Category</p>
                     <p className="text-sm font-semibold text-gray-900 capitalize">
                       {category?.name || category?.title || 'Uncategorized'}
                     </p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                     <BarChart className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Level</p>
                     <p className="text-sm font-semibold text-gray-900 capitalize">{data.level || 'Not specified'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                   <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                     <Globe className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-xs font-medium text-gray-500 uppercase">Language</p>
                     <p className="text-sm font-semibold text-gray-900 capitalize">{data.language || 'Global'}</p>
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

              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-blue-600 w-max">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-bold text-gray-900">Content Details</h3>
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

                <div>
                   <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                     <LayoutList className="w-4 h-4 text-gray-400" /> Overview
                   </h4>
                   <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-wrap">
                     {overview}
                   </div>
                </div>
                
                {data.image && (
                  <div>
                     <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                       <ImageIcon className="w-4 h-4 text-gray-400" /> Cover Image
                     </h4>
                     <img src={data.image} alt="Cover" className="w-full max-w-md rounded-xl border border-gray-200 shadow-sm" />
                  </div>
                )}
             </div>
          </div>

          {/* Pricing & Settings Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-emerald-500 w-max">
                  <Tag className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-bold text-gray-900">Pricing & Offers</h3>
                </div>
             </div>
             
             <div className="p-6">
               {price ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl border border-gray-100 bg-emerald-50/30 flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                       <Banknote className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">Base Price</p>
                       <p className="text-lg font-bold text-gray-900 mt-0.5">
                         {price.currency} {price.price}
                       </p>
                     </div>
                   </div>

                   <div className="p-4 rounded-xl border border-gray-100 bg-blue-50/30 flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <Percent className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-xs font-medium text-gray-500">Discount Price</p>
                       <p className="text-lg font-bold text-blue-700 mt-0.5">
                         {price.discount_price ? `${price.currency} ${price.discount_price}` : 'None'}
                       </p>
                     </div>
                   </div>

                   {(price.discount_type || price.discount_value) && (
                     <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                       <div>
                         <p className="text-xs font-medium text-gray-500">Discount Type</p>
                         <p className="text-sm font-semibold text-gray-900 capitalize mt-1">{price.discount_type || 'N/A'}</p>
                       </div>
                       <div>
                         <p className="text-xs font-medium text-gray-500">Discount Value</p>
                         <p className="text-sm font-semibold text-gray-900 mt-1">{price.discount_value || '0'}</p>
                       </div>
                       <div>
                         <p className="text-xs font-medium text-gray-500">Offer Starts</p>
                         <p className="text-sm font-semibold text-gray-900 mt-1 whitespace-nowrap">{formatDate(price.discount_start_at)}</p>
                       </div>
                       <div>
                         <p className="text-xs font-medium text-gray-500">Offer Ends</p>
                         <p className="text-sm font-semibold text-gray-900 mt-1 whitespace-nowrap">{formatDate(price.discount_end_at)}</p>
                       </div>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                    <Info className="w-8 h-8 text-gray-300 mb-2" />
                    <p>No pricing information available. This course might be completely free.</p>
                 </div>
               )}
             </div>
          </div>

          {/* Topics Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="border-b border-gray-100 px-6 pt-6">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-purple-500 w-max">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <h3 className="text-sm font-bold text-gray-900">Course Topics</h3>
                </div>
             </div>
             
             <div className="p-6">
               {data.topics && Object.keys(data.topics).length > 0 ? (
                  <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap">
                    {JSON.stringify(data.topics, null, 2)}
                  </pre>
               ) : (
                  <p className="text-sm text-gray-500 italic">No topics assigned yet.</p>
               )}
             </div>
          </div>
          {/* Translations Card */}
          {data.translations && data.translations.length > 0 && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="border-b border-gray-100 px-6 pt-6">
                  <div className="flex items-center gap-2 pb-4 border-b-2 border-purple-500 w-max">
                    <Globe className="w-5 h-5 text-purple-500" />
                    <h3 className="text-sm font-bold text-gray-900">Localization Data</h3>
                  </div>
               </div>
               
               <div className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {data.translations.map((t, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                          <span className="font-semibold text-gray-900">Language</span>
                          <span className="uppercase font-mono text-xs font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-200">
                            {t.languageCode}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 uppercase font-medium">Title</p>
                        <p className="text-sm text-gray-900 font-semibold mb-3">{t.title}</p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Description</p>
                        <p className="text-sm text-gray-700 mb-3">{t.description || 'N/A'}</p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Overview</p>
                        <p className="text-sm text-gray-700">{t.overview || 'N/A'}</p>
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

