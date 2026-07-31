'use client';

/**
 * Permission Edit View.
 * Screen component for editing an existing permission.
 */

import React from 'react';
import { PermissionForm } from '../components/PermissionForm';
import { useParams } from 'next/navigation';
import { AppLoader } from '@/features/common/components/AppLoader';
import { usePermissionDetails } from '../hooks/usePermissionDetails';

export function PermissionEditView() {
  const params = useParams();
  const id = params.id as string;
  const { permission, loading } = usePermissionDetails(id);

  if (loading) {
    return <AppLoader message="Loading permission..." />;
  }

  if (!permission) {
    return <div className="p-8 text-center text-red-500">Permission not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <PermissionForm initialData={permission} />
    </div>
  );
}
