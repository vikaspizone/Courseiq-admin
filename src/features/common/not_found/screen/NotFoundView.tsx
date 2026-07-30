"use client";
/**
 * NotFoundView component.
 * Renders the 404 custom page for the application.
 */

import React from 'react';
import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { NOT_FOUND_STRINGS } from '../constants';

export function NotFoundView() {
  const { language } = useLanguage();
  const strings = NOT_FOUND_STRINGS[language];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
        {/* Background glow effects to match the dashboard theme */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <SearchX size={40} strokeWidth={1.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-headline-lg">
            {strings.TITLE}
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 font-headline-md">
            {strings.SUBTITLE}
          </h2>
          
          <p className="text-gray-500 mb-8 max-w-sm mx-auto font-body-md">
            {strings.DESCRIPTION}
          </p>
          
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto"
          >
            {strings.GO_TO_DASHBOARD}
          </Link>
        </div>
      </div>
    </div>
  );
}
