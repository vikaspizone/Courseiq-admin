/**
 * Page Component.
 * Next.js page component for creating a permission.
 */

import React from 'react';
import { PermissionCreateView } from '@/features/permissions/screen/PermissionCreateView';

export const metadata = {
  title: 'Create Permission | Dashboard',
};

export default function CreatePermissionPage() {
  return <PermissionCreateView />;
}
