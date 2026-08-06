/**
 * Module Form Hook.
 * Custom hook for handling module form state and submission.
*/

import { useRouter } from 'next/navigation';
import { Module, ModulePayload } from '../types';
import { createModule, updateModule } from '../api';
import { ROUTES } from '@/features/common/constants/routes';

export function useModuleForm(initialData?: Module) {
  const router = useRouter();
  const isEditing = !!initialData;

  const handleSubmit = async (values: { name_en: string; name_hi: string; is_active?: boolean }, { setSubmitting }: any) => {
    try {
      const payload: ModulePayload = {
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
        await updateModule(initialData.id, payload);
      } else {
        await createModule(payload);
      }
      window.dispatchEvent(new Event('modulesUpdated'));
      router.push(ROUTES.MODULE);
    } catch (error) {
      console.error('Failed to save module', error);
      alert('Failed to save module');
    } finally {
      setSubmitting(false);
    }
  };

  return { isEditing, handleSubmit };
}
