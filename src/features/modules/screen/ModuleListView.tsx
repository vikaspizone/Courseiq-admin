/**
 * Module List View.
 * Screen component for the modules list.
 */

import React from 'react';
import { ModuleList } from '../components/ModuleList';

export function ModuleListView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <ModuleList />
    </div>
  );
}
