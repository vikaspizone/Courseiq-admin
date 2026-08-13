/**
 * Course Validation Schema.
 */
import * as Yup from 'yup';

export const getCourseSchema = (strings: any) => {
  return Yup.object().shape({
    category_id: Yup.string().required('Category is required'),
    type: Yup.string().required('Type is required'),
    level: Yup.string().required('Level is required'),
    slug: Yup.string().required('Slug is required'),
    language: Yup.string().required('Language is required'),
    status: Yup.string().required('Status is required'),
    translations: Yup.array().of(
      Yup.object().shape({
        languageCode: Yup.string().required('Language code is required'),
        title: Yup.string().required('Title is required').min(2, 'Title must be at least 2 characters').max(100, 'Title cannot exceed 100 characters'),
        description: Yup.string().max(500, 'Description cannot exceed 500 characters'),
        overview: Yup.string()
      })
    ).min(1, 'At least one translation is required'),
    prices: Yup.array().of(
      Yup.object().shape({
        currency: Yup.string().required('Currency is required'),
        price: Yup.number().min(0, 'Price must be non-negative').required('Price is required'),
        discount_price: Yup.number().min(0, 'Discount price must be non-negative'),
        discount_type: Yup.string(),
        discount_value: Yup.number().min(0, 'Discount value must be non-negative'),
      })
    )
  });
};
