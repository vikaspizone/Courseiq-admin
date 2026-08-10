'use client';

/**
 * useRouteGuard Hook.
 * Determines if the current route is accessible to the user based on their permissions.
 */
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { useModuleList } from '@/features/modules/hooks/useModuleList';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';

export function useRouteGuard() {
  const { userProfile, hasModuleAccess, loading: authLoading } = useAuth();
  const { modules, loading: modulesLoading } = useModuleList();
  const pathname = usePathname();
  const { language } = useLanguage();

  const currentModule = useMemo(() => {
    if (modulesLoading) return null;
    return modules.find((m) => {
      let rawName = '';
      if (language === 'hi') {
        const hiTranslation = m.translations?.find((t: any) => t.languageCode === 'hi');
        rawName = hiTranslation?.name || m.name || '';
      } else {
        const enTranslation = m.translations?.find((t: any) => t.languageCode === 'en');
        rawName = enTranslation?.name || m.name || '';
      }

      const formattedName = rawName
        .split(' ')
        .map((word: string) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '')
        .join(' ');

      const rawRoute = m.route || `/${formattedName.toLowerCase().replace(/\s+/g, '-')}`;
      const href = rawRoute.startsWith('/') ? rawRoute : `/${rawRoute}`;
      
      // Basic matching (e.g., /permission matches /permission and /permission/create)
      return pathname?.startsWith(href) && href !== '/';
    }) || null;
  }, [pathname, modules, modulesLoading, language]);

  const isAccessDenied = useMemo(() => {
    if (authLoading || modulesLoading || !userProfile) return false;
    
    // If it matches a module, check if the user has access to it
    if (currentModule) {
      return !hasModuleAccess(currentModule.id);
    }
    
    // If it doesn't match a module, it might be dashboard or some global route. Allow by default.
    return false;
  }, [currentModule, hasModuleAccess, userProfile, authLoading, modulesLoading]);

  const firstAccessibleRoute = useMemo(() => {
    if (authLoading || modulesLoading || !userProfile) return null;
    const firstModule = modules.find(m => m.is_active && hasModuleAccess(m.id));
    if (!firstModule) return null;
    
    let rawName = '';
    if (language === 'hi') {
      const hiTranslation = firstModule.translations?.find((t: any) => t.languageCode === 'hi');
      rawName = hiTranslation?.name || firstModule.name || '';
    } else {
      const enTranslation = firstModule.translations?.find((t: any) => t.languageCode === 'en');
      rawName = enTranslation?.name || firstModule.name || '';
    }

    const formattedName = rawName
      .split(' ')
      .map((word: string) => word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '')
      .join(' ');

    const rawRoute = firstModule.route || `/${formattedName.toLowerCase().replace(/\s+/g, '-')}`;
    return rawRoute.startsWith('/') ? rawRoute : `/${rawRoute}`;
  }, [modules, hasModuleAccess, userProfile, authLoading, modulesLoading, language]);

  return { isAccessDenied, authLoading, firstAccessibleRoute, currentModule };
}
