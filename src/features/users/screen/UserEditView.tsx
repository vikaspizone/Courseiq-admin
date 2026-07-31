'use client';

/**
 * User Edit View.
 * Screen component for editing an existing user.
 */

import React from 'react';
import { UserForm } from '../components/UserForm';
import { useParams } from 'next/navigation';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useUserDetails } from '../hooks/useUserDetails';

export function UserEditView() {
  const params = useParams();
  const id = params.id as string;
  const { user, loading } = useUserDetails(id);

  if (loading) {
    return <AppLoader message="Loading user..." />;
  }

  if (!user) {
    return <div className="p-8 text-center text-red-500">User not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <UserForm initialData={user} />
    </div>
  );
}
