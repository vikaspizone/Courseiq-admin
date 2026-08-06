/**
 * Page Component.
 * Next.js page component for creating a module.
 */

import React from 'react';
import { ModuleCreateView } from '@/features/modules/screen/ModuleCreateView';

export const metadata = {
  title: 'Create Module | Dashboard',
};

export default function CreateModulePage() {
  return <ModuleCreateView />;
}
