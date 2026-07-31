/**
 * Validation Constants.
 * Defines validation schemas for forms.
 */

import * as Yup from 'yup';

export const RoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Role Name is required'),
  description: Yup.string()
    .max(200, 'Description cannot exceed 200 characters')
    .required('Description is required'),
});
