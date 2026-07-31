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
  roleId: Yup.string().required('Role is required'),
  status: Yup.string().oneOf(['active', 'inactive']).required('Status is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .max(20, 'Phone number is too long')
    .optional(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  about: Yup.string()
    .max(500, 'About text cannot exceed 500 characters')
    .optional(),
});
