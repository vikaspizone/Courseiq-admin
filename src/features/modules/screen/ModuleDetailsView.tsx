'use client';

/**
 * Module Details View.
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { ModuleDetails } from '../components/ModuleDetails';
import { MODULE_STRINGS } from '../constants';
import { useModuleDetails } from '../hooks/useModuleDetails';

export const ModuleDetailsView: React.FC = () => {
  const strings = MODULE_STRINGS['en'];
  const params = useParams();
  const id = params?.id as string;
  const { module: data, loading } = useModuleDetails(id || "");

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-gray-500">{strings.NOT_FOUND}</div>;
  }

  return (
    <div className="w-full">
      <ModuleDetails data={data} />
    </div>
  );
};


