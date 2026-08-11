'use client';
/**
 * Course Category List View.
 * Screen component for listing course categories.
 */

import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, FolderOpen } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { Pagination } from '@/features/common/components/Pagination';
import { ROUTES } from '@/features/common/constants/routes';
import { useCourseCategories } from '../hooks/useCourseCategories';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { COURSE_CATEGORY_STRINGS } from '../constants';

export const CourseCategoryListView: React.FC = () => {
  const { categories, loading, handleDelete, page, setPage, pagination } = useCourseCategories();
  const { language } = useLanguage();
  
  const strings = COURSE_CATEGORY_STRINGS[language as keyof typeof COURSE_CATEGORY_STRINGS] || COURSE_CATEGORY_STRINGS.en;

  const getTranslationData = (category: any, field: 'title' | 'description') => {
    if (category?.translations && category.translations.length > 0) {
      let t = category.translations.find((x: any) => x.languageCode === language);
      if (!t) {
        t = category.translations.find((x: any) => x.languageCode === 'en');
      }
      if (!t) {
        t = category.translations[0];
      }
      if (t && t[field]) return t[field];
    }
    return category?.[field] || '';
  };

  if (loading) {
    return <AppLoader message="Loading course categories..." />;
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-600" />
            {strings.TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{strings.DESC}</p>
        </div>
        <Link
          href={ROUTES.COURSE_CATEGORY_CREATE}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {strings.ADD_CATEGORY}
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_TITLE}</th>
                <th className="px-6 py-4">{strings.TH_DESC}</th>
                <th className="px-6 py-4">{strings.TH_STATUS}</th>
                <th className="px-6 py-4">{strings.TH_CREATED}</th>
                <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_CATEGORIES}
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {getTranslationData(category, 'title') || 'Untitled'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]" title={getTranslationData(category, 'description')}>
                      {getTranslationData(category, 'description') || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm ${
                        category.is_active ? 'text-green-700 bg-green-50 border-green-200' : 'text-gray-700 bg-gray-50 border-gray-200'
                      }`}>
                        {category.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {category.created_at ? new Date(category.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <Link
                        href={`${ROUTES.COURSE_CATEGORY}/${category.id}`}
                        className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-2"
                        title={strings.EDIT_TITLE}
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Category"
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

      {pagination && (
        <Pagination 
          currentPage={pagination.currentPage || page} 
          totalPages={pagination.totalPages || 1} 
          onPageChange={setPage}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
        />
      )}
    </div>
  );
};
