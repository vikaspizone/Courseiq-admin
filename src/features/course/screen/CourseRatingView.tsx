'use client';
/**
 * Course Rating View.
 * Displays the course ratings and feedback interface.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, BookOpen, User } from 'lucide-react';
import { ROUTES } from '@/features/common/constants/routes';
import { COURSE_STRINGS } from '../constants';

const MOCK_RATINGS = [
  { id: 1, courseTitle: 'Introduction to React Native', student: 'Alice Smith', rating: 5, comment: 'Excellent course, highly recommended!' },
  { id: 2, courseTitle: 'Advanced UI/UX Design', student: 'Bob Johnson', rating: 4, comment: 'Very good material, could use more examples.' },
  { id: 3, courseTitle: 'Mastering Next.js 14', student: 'Charlie Davis', rating: 5, comment: 'The best Next.js course I have taken.' },
];

export function CourseRatingView() {
  const strings = COURSE_STRINGS['en'];

  return (
    <div className="p-6 md:p-8 w-full space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            {strings.RATING_TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{strings.RATING_DESC}</p>
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
                <th className="px-6 py-4">{strings.TH_STUDENT}</th>
                <th className="px-6 py-4">{strings.TH_RATING}</th>
                <th className="px-6 py-4">{strings.TH_COMMENT}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_RATINGS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    {item.courseTitle}
                  </td>
                  <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {item.student}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={item.comment}>
                    {item.comment}
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
