/**
 * Role Create View.
 * Screen component for creating a new role.
 */

import React from 'react';
import { RoleForm } from '../components/RoleForm';

export function RoleCreateView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <RoleForm />
    </div>
  );
}
