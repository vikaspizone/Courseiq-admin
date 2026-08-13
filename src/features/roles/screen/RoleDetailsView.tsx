'use client';

/**
 * Role Details View.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { RoleDetails } from '../components/RoleDetails';
import { ROLE_STRINGS } from '../constants';
import { useRoleDetails } from '../hooks/useRoleDetails';

export const RoleDetailsView: React.FC = () => {
  const strings = ROLE_STRINGS['en'];
  const params = useParams();
  const id = params.id as string;
  const { role: data, loading } = useRoleDetails(id);

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-500">{strings.NOT_FOUND}</div>;
  }

  return (
    <div className="w-full">
      <RoleDetails data={data} />
    </div>
  );
};


