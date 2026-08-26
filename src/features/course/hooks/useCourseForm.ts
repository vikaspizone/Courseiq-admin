/**
 * Course Form Hook.
 */
import { useRouter } from 'next/navigation';
import { Course, CoursePayload } from '../types';
import { createCourse, updateCourse } from '../api';
import { ROUTES } from '@/features/common/constants/routes';

export const useCourseForm = (initialData?: Course) => {
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
          description: values.description_en || '',
          overview: values.overview_en || ''
        });
      }
      // Hindi
      if (values.title_hi) {
        translations.push({
          languageCode: 'hi',
          title: values.title_hi,
          description: values.description_hi || '',
          overview: values.overview_hi || ''
        });
      }

        let parsedTopics = {};
        try {
          if (typeof values.topics === 'string' && values.topics.trim()) {
            parsedTopics = JSON.parse(values.topics);
          } else if (typeof values.topics === 'object') {
            parsedTopics = values.topics;
          }
        } catch (e) {
          console.error("Failed to parse topics JSON", e);
        }

        let pricePayload = undefined;
        if (values.type !== 'free' && values.prices && values.prices.length > 0) {
          const p = values.prices[0];
          pricePayload = {
            currency: p.currency,
            price: Number(p.price) || 0,
            discount_price: Number(p.discount_price) || 0,
            discount_type: p.discount_type,
            discount_value: Number(p.discount_value) || 0,
            discount_start_at: p.discount_start_at ? new Date(p.discount_start_at).toISOString() : undefined,
            discount_end_at: p.discount_end_at ? new Date(p.discount_end_at).toISOString() : undefined,
          };
        }

        const payload: any = {
          category_id: values.category_id,
          type: values.type,
          level: values.level,
          slug: values.slug,
          language: values.language,
          topics: parsedTopics,
          status: values.status,
          translations,
          price: pricePayload,
          media: (values.media || []).map((m: any) => {
            const { id, course_id, created_at, updated_at, created_by, updated_by, file_name, file_path, mime_type, file_size, is_active, _previewUrl, ...rest } = m;
            return rest;
          })
        };

        let finalPayload: any = payload;
        
        if (values.mediaFiles && values.mediaFiles.length > 0) {
          const formData = new FormData();
          
          Object.keys(payload).forEach(key => {
            if (payload[key] !== undefined && payload[key] !== null) {
              if (typeof payload[key] === 'object') {
                formData.append(key, JSON.stringify(payload[key]));
              } else {
                formData.append(key, payload[key]);
              }
            }
          });

          values.mediaFiles.forEach((file: File) => {
            formData.append('mediaFiles', file);
          });
          
          finalPayload = formData;
        }

      if (isEditing && initialData.id) {
        await updateCourse(initialData.id, finalPayload);
        alert('Course updated successfully');
      } else {
        await createCourse(finalPayload);
        alert('Course created successfully');
      }

      router.push(ROUTES.COURSE);
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'An error occurred while saving the course');
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
