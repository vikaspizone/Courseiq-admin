'use client';

/**
 * Module Edit View.
 * Screen component for editing an existing module.
 */

import React from 'react';
import { ModuleForm } from '../components/ModuleForm';
import { useParams } from 'next/navigation';
import { AppLoader } from '@/features/common/components/AppLoader';
import { useModuleDetails } from '../hooks/useModuleDetails';

export function ModuleEditView() {
  const params = useParams();
  const id = params?.id as string;
  const { module, loading } = useModuleDetails(id || "");

  if (loading) {
    return <AppLoader message="Loading module..." />;
  }

  if (!module) {
    return <div className="p-8 text-center text-red-500">Module not found.</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full">
      <ModuleForm initialData={module} />
    </div>
  );
}
