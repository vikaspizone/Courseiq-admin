'use client';

/**
 * User Details View.
 * Screen component for viewing user details.
 */

import React from 'react';
import { UserDetails } from '../components/UserDetails';
import { useParams } from 'next/navigation';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useUserDetails } from '../hooks/useUserDetails';

export function UserDetailsView() {
  const params = useParams();
  const id = params.id as string;
  const { user, loading } = useUserDetails(id);

  if (loading) {
    return <AppLoader message="Loading user details..." />;
  }

  if (!user) {
    return <div className="p-8 text-center text-red-500">User not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <UserDetails user={user} />
    </div>
  );
}
