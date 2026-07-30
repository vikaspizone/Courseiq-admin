"use client";
/**
 * LanguageSwitcher component.
 * Allows users to change the application language.
 */

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { SUPPORTED_LANGUAGES } from "../constants";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-md px-2 py-1">
      <Globe className="h-4 w-4 text-gray-500" />
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
        className="bg-transparent text-sm text-gray-700 py-1 pr-2 border-none cursor-pointer focus:outline-none"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-white text-gray-900">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
