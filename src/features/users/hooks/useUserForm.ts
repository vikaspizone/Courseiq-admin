/**
 * useUserForm Hook.
 * Provides useUserForm functionality for the feature.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserPayload } from '../types';
import { createUser, updateUser } from '../api/userApi';
import { getRoles } from '@/features/roles/api/roleApi';
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
      const payload = {
        ...values,
        is_active: values.is_active === true || String(values.is_active) === 'true',
        experience: values.experience ? Number(values.experience) : 0,
        languages: typeof values.languages === 'string' ? values.languages.split(',').map((l: string) => l.trim()).filter(Boolean) : values.languages,
        qualification: values.qualification ? {
          ...values.qualification,
          year: values.qualification.year ? Number(values.qualification.year) : new Date().getFullYear(),
        } : undefined,
      };

      if (isEditing && initialData && initialData.id) {
        await updateUser(initialData.id, payload);
      } else {
        await createUser(payload);
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
