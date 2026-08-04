/**
 * userSchema Validation.
 * Provides userSchema functionality for the feature.
 */

import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  role_id: Yup.string().required('Role is required'),
  gender: Yup.string(),
  profile_image: Yup.string(),
  password: Yup.string(),
  about: Yup.string(),
  dateOfBirth: Yup.string(),
  isActive: Yup.boolean(),
  is_active: Yup.boolean(),
  qualification: Yup.object().shape({
    degree: Yup.string(),
    year: Yup.number().typeError('Year must be a number')
  }),
  experience: Yup.number().typeError('Experience must be a number'),
  languages: Yup.array().of(Yup.string()),
  address: Yup.object().shape({
    city: Yup.string(),
    country: Yup.string()
  }),
  work: Yup.object().shape({
    company: Yup.string(),
    title: Yup.string()
  })
});
