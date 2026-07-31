/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { RoleEditView } from '@/features/roles/screen/RoleEditView';

export const metadata = {
  title: 'Edit Role | Dashboard',
};

export default function EditRolePage() {
  return <RoleEditView />;
}
