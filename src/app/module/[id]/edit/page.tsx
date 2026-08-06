/**
 * Page Component.
 * Next.js page component for editing a module.
 */

import React from 'react';
import { ModuleEditView } from '@/features/modules/screen/ModuleEditView';

export const metadata = {
  title: 'Edit Module | Dashboard',
};

export default function EditModulePage() {
  return <ModuleEditView />;
}
