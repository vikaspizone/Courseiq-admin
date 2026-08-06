/**
 * Module Create View.
 * Screen component for creating a new module.
 */

import React from 'react';
import { ModuleForm } from '../components/ModuleForm';

export function ModuleCreateView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <ModuleForm />
    </div>
  );
}
