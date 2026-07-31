/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { UserEditView } from '@/features/users/screen/UserEditView';

export const metadata = {
  title: 'Edit User | Dashboard',
};

export default function EditUserPage() {
  return <UserEditView />;
}
