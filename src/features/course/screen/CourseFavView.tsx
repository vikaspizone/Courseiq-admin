'use client';
/**
 * Course Favorites View.
 * Displays the list of favorite courses and related UI components.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, BookOpen } from 'lucide-react';
import { ROUTES } from '@/features/common/constants/routes';
import { COURSE_STRINGS } from '../constants';

const MOCK_FAVORITES = [
  { id: 1, title: 'Introduction to React Native', category: 'Mobile Development', author: 'John Doe' },
  { id: 2, title: 'Advanced UI/UX Design', category: 'Design', author: 'Jane Smith' },
  { id: 3, title: 'Mastering Next.js 14', category: 'Web Development', author: 'Alex Johnson' },
];

export function CourseFavView() {
  const strings = COURSE_STRINGS['en'];

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            {strings.FAV_TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{strings.FAV_DESC}</p>
        </div>
        <Link
          href={ROUTES.COURSE}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-10 py-2 px-4 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {strings.BACK_TO_COURSES}
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">{strings.TH_COURSE_TITLE}</th>
                <th className="px-6 py-4">{strings.TH_CATEGORY}</th>
                <th className="px-6 py-4">{strings.TH_AUTHOR}</th>
                <th className="px-6 py-4 text-right">{strings.TH_ACTIONS}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_FAVORITES.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{course.category}</td>
                  <td className="px-6 py-4 text-gray-500">{course.author}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex p-1.5 items-center justify-center rounded-md text-red-500 hover:bg-red-50 transition-colors" title={strings.REMOVE_FAV}>
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
