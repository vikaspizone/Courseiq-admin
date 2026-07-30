"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import { COMMON_STRINGS } from "@/features/common/lang/constants";

interface AppLoaderProps {
  message?: string;
}

export function AppLoader({ message }: AppLoaderProps) {
  const { language } = useLanguage();
  const strings = COMMON_STRINGS[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="flex flex-col items-center p-8 bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 max-w-sm w-[90%] mx-auto">
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-primary/10 rounded-full animate-pulse"></div>
          <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
        </div>
        
        <h3 className="text-xl font-headline-md font-semibold text-on-surface mb-2 tracking-tight text-center">
          {message || strings.LOADING}
        </h3>
        <p className="text-sm font-body-sm text-on-surface-variant text-center max-w-[250px]">
          {strings.PLEASE_WAIT}
        </p>
      </div>
    </div>
  );
}
