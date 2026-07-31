/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { UserListView } from '@/features/users/screen/UserListView';

export const metadata = {
  title: 'Users | Dashboard',
};

export default function UsersPage() {
  return <UserListView />;
}
