/**
 * Page Component.
 * Next.js page component for the route.
 */

import React from 'react';
import { UserCreateView } from '@/features/users/screen/UserCreateView';

export const metadata = {
  title: 'Create User | Dashboard',
};

export default function CreateUserPage() {
  return <UserCreateView />;
}
