/**
 * Permission List View.
 * Screen component for the permissions list.
 */

import React from 'react';
import { PermissionList } from '../components/PermissionList';

export function PermissionListView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <PermissionList />
    </div>
  );
}
