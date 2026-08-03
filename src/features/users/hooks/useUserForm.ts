/**
 * User Form Hook.
 * Custom hook for handling user form state and submission.
*/

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types';
import { createUser, updateUser } from '../api/mockData';
import { getRoles } from '@/features/roles/api/mockData';
import { Role } from '@/features/roles/types';
import { ROUTES } from '@/features/common/constants/routes';

export function useUserForm(initialData?: User) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };
    Promise.resolve().then(() => fetchRoles());
  }, []);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (isEditing && initialData) {
        await updateUser(initialData.id, values);
      } else {
        await createUser(values);
      }
      router.push(ROUTES.USER);
    } catch (error) {
      console.error('Failed to save user', error);
      alert('Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  return { isEditing, handleSubmit, roles };
}
