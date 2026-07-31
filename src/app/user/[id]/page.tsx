/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { UserDetailsView } from '@/features/users/screen/UserDetailsView';

export const metadata = {
  title: 'User Details | Dashboard',
};

export default function UserDetailsPage() {
  return <UserDetailsView />;
}
