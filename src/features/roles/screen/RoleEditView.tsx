'use client';

/**
 * Role Edit View.
 * Screen component for editing an existing role.
 */

import React from 'react';
import { RoleForm } from '../components/RoleForm';
import { useParams } from 'next/navigation';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useRoleDetails } from '../hooks/useRoleDetails';

export function RoleEditView() {
  const params = useParams();
  const id = params?.id as string;
  const { role, loading } = useRoleDetails(id || "");

  if (loading) {
    return <AppLoader message="Loading role..." />;
  }

  if (!role) {
    return <div className="p-8 text-center text-red-500">Role not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <RoleForm initialData={role} />
    </div>
  );
}
