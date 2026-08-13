/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { UserDetailsView } from '@/features/users/screen/UserDetailsView';

export const metadata = {
  title: 'View User | Dashboard',
};

export default function ViewUserPage() {
  return <UserDetailsView />;
}
