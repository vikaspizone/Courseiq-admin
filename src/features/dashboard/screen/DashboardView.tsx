"use client";
/**
 * DashboardView component.
 * Renders the main dashboard interface for authenticated users.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/features/common/components/Card";
import { Header } from "@/features/common/header/components/Header";
import { NavigationMenu } from "@/features/common/header/components/NavigationMenu";
import { DASHBOARD_STRINGS } from "../constants";
import { useLanguage } from "@/features/common/lang/contexts/LanguageContext";
import styles from "../styles/dashboard.module.css";

export function DashboardView() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { language } = useLanguage();
  const strings = DASHBOARD_STRINGS[language];

  useEffect(() => {
    // Check if user is logged in
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    router.push("/login");
  };

  if (!userEmail) {
    return (
      <div className={`${styles.dashboardContainer} flex items-center justify-center`}>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-gray-900">
      {/* Sidebar */}
      <NavigationMenu isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        <Header 
          userEmail={userEmail} 
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Card className={`${styles.welcomeCard} border-gray-200 rounded-3xl bg-white shadow-sm`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
                {strings.WELCOME_BACK} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mt-2 inline-block">
                  {userEmail}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mt-4">
                {strings.SUCCESS_MSG}
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
