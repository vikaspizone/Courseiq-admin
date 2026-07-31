/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { RoleCreateView } from '@/features/roles/screen/RoleCreateView';

export const metadata = {
  title: 'Create Role | Dashboard',
};

export default function CreateRolePage() {
  return <RoleCreateView />;
}
