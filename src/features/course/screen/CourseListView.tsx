'use client';

/**
 * Course List View
 */
import React from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ArrowLeft, Eye, BookOpen, Heart, Star } from 'lucide-react';
import { AppLoader } from '@/features/common/components/AppLoader';
import { Pagination } from '@/features/common/components/Pagination';
import { ROUTES } from '@/features/common/constants/routes';
import { useCourseList } from '../hooks/useCourseList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { COURSE_STRINGS } from '../constants';

export function CourseListView() {
  const { courses, loading, handleDelete, page, setPage, pagination } = useCourseList();
  const { language } = useLanguage();
  
  const strings = COURSE_STRINGS[language as keyof typeof COURSE_STRINGS] || COURSE_STRINGS.en;

  const getTranslationData = (course: any, field: 'title' | 'description') => {
    if (course?.translations && course.translations.length > 0) {
      let t = course.translations.find((x: any) => x.languageCode === language);
      if (!t) {
        t = course.translations.find((x: any) => x.languageCode === 'en');
      }
      if (!t) {
        t = course.translations[0];
      }
      if (t && t[field]) return t[field];
    }
    return course?.[field] || '';
  };

  if (loading) {
    return <AppLoader message="Loading courses..." />;
  }

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            {strings.TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{strings.DESC}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.COURSE_CREATE}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            {strings.ADD_COURSE}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_TITLE}</th>
                <th className="px-6 py-4">{strings.TH_CATEGORY}</th>
                <th className="px-6 py-4">{strings.TH_STATUS}</th>
                <th className="px-6 py-4 text-center">Features</th>
                <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {strings.NO_COURSES}
                  </td>
                </tr>
              ) : (
                courses.map((course) => {
                  const categoryName = course.category?.title || course.category?.translations?.find((t: any) => t.languageCode === 'en')?.title || '-';

                  return (
                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {getTranslationData(course, 'title') || 'Untitled'}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {categoryName}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm ${
                          course.status === 'published' ? 'text-green-700 bg-green-50 border-green-200' : 'text-gray-700 bg-gray-50 border-gray-200'
                        }`}>
                          {course.status ? course.status.charAt(0).toUpperCase() + course.status.slice(1) : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <Link
                            href={`${ROUTES.COURSE_FAV}?courseId=${course.id}`}
                            className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-8 py-1 px-3 shadow-sm"
                          >
                            <Heart className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                            Favorites
                          </Link>
                          <Link
                            href={`${ROUTES.COURSE_RATING}?courseId=${course.id}`}
                            className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-8 py-1 px-3 shadow-sm"
                          >
                            <Star className="w-3.5 h-3.5 mr-1.5 text-yellow-500" />
                            Ratings
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1 flex justify-end items-center">
                        <Link
                          href={`${ROUTES.COURSE}/${course.id}`}
                          className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-1"
                          title="View Course"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`${ROUTES.COURSE}/${course.id}/edit`}
                          className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-2"
                          title={strings.EDIT_TITLE}
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="inline-flex p-1.5 items-center justify-center rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
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
}
