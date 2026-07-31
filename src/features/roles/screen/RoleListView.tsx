/**
 * Role List View.
 * Screen component for the roles list.
 */

import React from 'react';
import { RoleList } from '../components/RoleList';

export function RoleListView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <RoleList />
    </div>
  );
}
