'use client';
/**
 * NavigationMenu component.
 * Renders the collapsible sidebar navigation menu with mapped items.
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ChevronLeft } from "lucide-react";
import { HEADER_STRINGS } from "../constants";
import { NAVIGATION_ITEMS } from "../constants/navigationConfig";
import { useLanguage } from "../../lang/contexts/LanguageContext";

interface NavigationMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function NavigationMenu({ isOpen, onToggle }: NavigationMenuProps) {
  const { language } = useLanguage();
  const strings = HEADER_STRINGS[language];
  const pathname = usePathname();

  return (
    <div className={`flex-shrink-0 bg-white h-full flex flex-col z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
      <div className="py-6 overflow-y-auto overflow-x-hidden">
        
        {/* Top Header inside Sidebar */}
        <div className={`flex items-center ${isOpen ? 'justify-between px-6' : 'justify-center'} mb-10 mt-2`}>
          <div className="flex items-center gap-3">
            <div 
              className="bg-blue-600 p-2.5 rounded-xl text-white cursor-pointer shadow-md"
              onClick={!isOpen ? onToggle : undefined}
            >
              <GraduationCap className="h-6 w-6" />
            </div>
            {isOpen && (
              <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap tracking-tight">
                {strings.APP_NAME || "CoursIQ."}
              </h2>
            )}
          </div>
          {isOpen && (
            <button 
              onClick={onToggle} 
              className="p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-colors flex-shrink-0"
              title="Close menu"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5 px-4">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const href = `/${item.id}`;
            const is_active = pathname?.startsWith(href);
            
            return (
              <Link 
                key={item.id}
                href={href} 
                className={`flex items-center ${isOpen ? 'justify-start px-4' : 'justify-center px-0'} py-3 text-[15px] font-medium rounded-xl transition-colors group relative ${
                  is_active 
                    ? "text-blue-600 bg-blue-50/50" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`} 
                title={strings[item.translationKey]}
              >
                {item.hasRedDot ? (
                  <div className="relative">
                    <Icon className="h-[22px] w-[22px] flex-shrink-0" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                  </div>
                ) : (
                  <Icon className="h-[22px] w-[22px] flex-shrink-0" />
                )}
                
                {isOpen && (
                  <>
                    <span className={`ml-3.5 whitespace-nowrap ${item.badge ? 'flex-1' : ''}`}>
                      {strings[item.translationKey]}
                    </span>
                    {item.badge && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
