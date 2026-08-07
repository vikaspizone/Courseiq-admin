'use client';

/**
 * AccessDenied Component.
 * Displays an empty state screen when a user does not have permission to view a page.
 */
import React from 'react';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { AUTH_STRINGS } from '@/features/auth/constants';

export function AccessDenied() {
  const { language } = useLanguage();
  const strings = AUTH_STRINGS[language];

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{strings.ACCESS_DENIED}</h2>
      <p className="text-gray-500">{strings.ACCESS_DENIED_DESC}</p>
    </div>
  );
}
