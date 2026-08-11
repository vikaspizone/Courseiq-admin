import { useRouter } from 'next/navigation';
import { CourseCategory, CourseCategoryPayload } from '../types';
import { createCourseCategory, updateCourseCategory } from '../api';
import { ROUTES } from '@/features/common/constants/routes';

export const useCourseCategoryForm = (initialData?: CourseCategory) => {
  const router = useRouter();
  const isEditing = !!initialData;

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const translations = [];

      // English
      if (values.title_en) {
        translations.push({
          languageCode: 'en',
          title: values.title_en,
          description: values.description_en || ''
        });
      }
      // Hindi
      if (values.title_hi) {
        translations.push({
          languageCode: 'hi',
          title: values.title_hi,
          description: values.description_hi || ''
        });
      }

      const payload: any = {
        status: values.status,
        translations
      };

      if (isEditing && initialData.id) {
        await updateCourseCategory(initialData.id, payload);
        alert('Course category updated successfully');
      } else {
        await createCourseCategory(payload);
        alert('Course category created successfully');
      }

      router.push(ROUTES.COURSE_CATEGORY);
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'An error occurred while saving the category');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    isEditing,
    handleSubmit
  };
};
