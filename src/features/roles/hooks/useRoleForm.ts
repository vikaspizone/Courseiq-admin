/**
 * Role Form Hook.
 * Custom hook for handling role form state and submission.
*/

import { useRouter } from 'next/navigation';
import { Role } from '../types';
import { createRole, updateRole } from '../api/mockData';
import { ROUTES } from '@/features/common/constants/routes';

export function useRoleForm(initialData?: Role) {
  const router = useRouter();
  const isEditing = !!initialData;

  const handleSubmit = async (values: { name: string; description: string }, { setSubmitting }: any) => {
    try {
      if (isEditing && initialData) {
        await updateRole(initialData.id, values);
      } else {
        await createRole(values);
      }
      router.push(ROUTES.ROLE);
    } catch (error) {
      console.error('Failed to save role', error);
      alert('Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  return { isEditing, handleSubmit };
}
