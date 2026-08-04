/**
 * Validation Constants.
 * Defines validation schemas for forms.
 */

import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .max(20, 'Phone number is too long')
    .optional(),
  gender: Yup.string(),
  profile_image: Yup.string(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .optional(), // Make optional so edit doesn't require it, we can handle required dynamically if needed
  about: Yup.string()
    .max(500, 'About text cannot exceed 500 characters')
    .optional(),
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
  }),
  role_id: Yup.string().required('Role is required'),
});
