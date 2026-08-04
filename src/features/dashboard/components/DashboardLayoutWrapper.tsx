'use client';

/**
 * DashboardLayoutWrapper Component.
 * UI component for DashboardLayoutWrapper.
 */

import React from 'react';
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { Header } from "@/features/common/header/components/Header";
import { NavigationMenu } from "@/features/common/header/components/NavigationMenu";

export function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { userEmail, userProfile, isSidebarOpen, setIsSidebarOpen, handleLogout } = useDashboard();

  if (!userEmail) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-gray-900">
      <NavigationMenu isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <Header 
          userEmail={userEmail} 
          userProfile={userProfile}
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
