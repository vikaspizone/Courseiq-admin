/**
 * Role Form Hook.
 * Custom hook for handling role form state and submission.
*/

import { useRouter } from 'next/navigation';
import { Role } from '../types';
import { createRole, updateRole } from '../api/roleApi';
import { ROUTES } from '@/features/common/constants/routes';

export function useRoleForm(initialData?: Role) {
  const router = useRouter();
  const isEditing = !!initialData;

  const handleSubmit = async (values: { name: string; description?: string; isActive?: boolean; is_active?: boolean }, { setSubmitting }: any) => {
    try {
      const payload = { 
        name: values.name, 
        isActive: values.isActive === true || String(values.isActive) === 'true'
      };
      if (isEditing && initialData?.id) {
        await updateRole(initialData.id, payload);
      } else {
        await createRole(payload);
      }
      router.push(ROUTES.ROLE);
    } catch (error: any) {
      console.error('Failed to save role', error);
      alert(error.message || 'Failed to save role');
    } finally {
      setSubmitting(false);
    }
  };

  return { isEditing, handleSubmit };
}
