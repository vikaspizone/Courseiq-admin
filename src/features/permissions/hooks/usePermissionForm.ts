/**
 * Permission Form Hook.
 * Custom hook for handling permission form state and submission.
*/

import { useRouter } from 'next/navigation';
import { Permission } from '../types';
import { createPermission, updatePermission } from '../api/mockData';
import { ROUTES } from '@/features/common/constants/routes';

export function usePermissionForm(initialData?: Permission) {
  const router = useRouter();
  const isEditing = !!initialData;

  const handleSubmit = async (values: { name: string; description: string }, { setSubmitting }: any) => {
    try {
      if (isEditing && initialData) {
        await updatePermission(initialData.id, values);
      } else {
        await createPermission(values);
      }
      router.push(ROUTES.PERMISSION);
    } catch (error) {
      console.error('Failed to save permission', error);
      alert('Failed to save permission');
    } finally {
      setSubmitting(false);
    }
  };

  return { isEditing, handleSubmit };
}
