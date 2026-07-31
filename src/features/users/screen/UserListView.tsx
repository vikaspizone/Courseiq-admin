/**
 * User List View.
 * Screen component for the users list.
 */

import React from 'react';
import { UserList } from '../components/UserList';

export function UserListView() {
  return (
    <div className="p-6 md:p-8 w-full">
      <UserList />
    </div>
  );
}
