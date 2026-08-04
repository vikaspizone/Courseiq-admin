"use client";
/**
 * Header component.
 * Renders the top navigation and user menu.
 */

import React from "react";
import { LogOut, User, Bell, Search, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../../lang/contexts/LanguageContext";
import { LanguageSwitcher } from "../../lang/components/LanguageSwitcher";
import { HEADER_STRINGS } from "../constants";
import { useHeader } from "../hooks/useHeader";

interface HeaderProps {
  userEmail?: string | null;
  userProfile?: any;
  onLogout?: () => void;
  isSidebarOpen?: boolean;
  onMenuClick?: () => void;
}

export function Header({ userEmail, userProfile, onLogout, isSidebarOpen = false, onMenuClick }: HeaderProps) {
  const { language } = useLanguage();
  const strings = HEADER_STRINGS[language];
  const { isProfileOpen, setIsProfileOpen, profileRef, userName } = useHeader({ userProfile, userEmail });


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
            <div className="relative" ref={profileRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-200">
                  <img 
                    src={userProfile?.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0"} 
                    alt="User Avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {userName}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-200 mb-3">
                      <img 
                        src={userProfile?.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e2e8f0"} 
                        alt="User Avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-base font-semibold text-slate-800">{userName}</div>
                    <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {userEmail}
                    </div>
                    {userProfile?.phone_number && (
                      <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {userProfile.phone_number}
                      </div>
                    )}
                    {userProfile?.location && (
                      <div className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {userProfile.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors">
                      <User className="h-4 w-4 text-slate-400" />
                      Profile Settings
                    </button>
                    {onLogout && (
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                      >
                        <LogOut className="h-4 w-4 text-red-500" />
                        {strings.LOGOUT_BUTTON}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}