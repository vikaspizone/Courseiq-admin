/**
 * Page Component.
 * Next.js page component for the permission route.
 */

import React from 'react';
import { PermissionListView } from '@/features/permissions/screen/PermissionListView';

export const metadata = {
  title: 'Permissions | Dashboard',
};

export default function PermissionsPage() {
  return <PermissionListView />;
}
