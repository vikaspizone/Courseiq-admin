/**
 * Page Component.
 * Next.js page component for the module route.
 */

import React from 'react';
import { ModuleListView } from '@/features/modules/screen/ModuleListView';

export const metadata = {
  title: 'Modules | Dashboard',
};

export default function ModulesPage() {
  return <ModuleListView />;
}
