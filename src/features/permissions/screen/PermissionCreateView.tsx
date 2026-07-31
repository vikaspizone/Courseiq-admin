/**
 * Permission Create View.
 * Screen component for creating a new permission.
 */

import React from 'react';
import { PermissionForm } from '../components/PermissionForm';

export function PermissionCreateView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <PermissionForm />
    </div>
  );
}
