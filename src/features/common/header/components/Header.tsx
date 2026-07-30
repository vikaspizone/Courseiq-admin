"use client";
/**
 * Header component.
 * Renders the top navigation and user menu.
 */

import React from "react";
import { LogOut, User, Bell, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "../../lang/contexts/LanguageContext";
import { LanguageSwitcher } from "../../lang/components/LanguageSwitcher";
import { HEADER_STRINGS } from "../constants";

interface HeaderProps {
  userEmail?: string | null;
  onLogout?: () => void;
  isSidebarOpen?: boolean;
  onMenuClick?: () => void;
}

export function Header({ userEmail, onLogout, isSidebarOpen = false, onMenuClick }: HeaderProps) {
  const { language } = useLanguage();
  const strings = HEADER_STRINGS[language];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="px-6 lg:px-8">
        <div className="flex justify-end items-center h-[72px]">
          
          {/* Right side: Language, Bell, User */}
          <div className="flex items-center gap-6 ml-4 flex-shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Bell Icon */}
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center p-1">
              <Bell className="h-[22px] w-[22px]" />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-slate-300 rounded-full"></span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-200">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0" 
                  alt="User Avatar" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  {userEmail || "Emma Kwan"}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center p-1 ml-2"
                title={strings.LOGOUT_BUTTON}
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}