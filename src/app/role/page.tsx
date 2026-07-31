/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { RoleListView } from '@/features/roles/screen/RoleListView';

export const metadata = {
  title: 'Roles | Dashboard',
};

export default function RolesPage() {
  return <RoleListView />;
}
