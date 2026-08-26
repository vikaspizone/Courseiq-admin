'use client';

/**
 * Permission Details View.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { PermissionDetails } from '../components/PermissionDetails';
import { PERMISSION_STRINGS } from '../constants';
import { usePermissionDetails } from '../hooks/usePermissionDetails';

export const PermissionDetailsView: React.FC = () => {
  const strings = PERMISSION_STRINGS['en'];
  const params = useParams();
  const id = params?.id as string;
  const { permission: data, loading } = usePermissionDetails(id || "");

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-500">{strings.NOT_FOUND}</div>;
  }

  return (
    <div className="w-full">
      <PermissionDetails data={data} />
    </div>
  );
};


