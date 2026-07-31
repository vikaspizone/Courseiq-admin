/**
 * User Create View.
 * Screen component for creating a new user.
 */

import React from 'react';
import { UserForm } from '../components/UserForm';

export function UserCreateView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <UserForm />
    </div>
  );
}
