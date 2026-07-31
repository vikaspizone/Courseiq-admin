/**
 * Page Component.
 * Next.js page component for editing a permission.
 */

import React from 'react';
import { PermissionEditView } from '@/features/permissions/screen/PermissionEditView';

export const metadata = {
  title: 'Edit Permission | Dashboard',
};

export default function EditPermissionPage() {
  return <PermissionEditView />;
}
