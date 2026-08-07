/**
 * Permission Form Hook.
 * Custom hook for handling permission form state and submission.
*/

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Permission, PermissionPayload } from '../types';
import { createPermission, updatePermission } from '../api';
import { ROUTES } from '@/features/common/constants/routes';

export function usePermissionForm(initialData?: Permission) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isCodeManuallySet, setIsCodeManuallySet] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  const handleSubmit = async (values: { name_en: string; name_hi: string; code: string; is_active?: boolean }, { setSubmitting }: any) => {
    try {
      const payload: PermissionPayload = {
        code: values.code,
        is_active: values.is_active ?? true,
        translations: [
          {
            languageCode: 'en',
            name: values.name_en,
          },
          ...(values.name_hi ? [{
            languageCode: 'hi',
            name: values.name_hi,
          }] : [])
        ]
      };
      
      if (isEditing && initialData) {
        await updatePermission(initialData.id, payload);
      } else {
        await createPermission(payload);
      }
      router.push(ROUTES.PERMISSION);
    } catch (error) {
      console.error('Failed to save permission', error);
      alert('Failed to save permission');
    } finally {
      setSubmitting(false);
    }
  };

  return { 
    isEditing, 
    handleSubmit,
    isCodeManuallySet,
    setIsCodeManuallySet,
    isTipsModalOpen,
    setIsTipsModalOpen
  };
}
