/**
 * Validation Constants for Permissions.
 * Defines validation schemas for permission forms.
 */

import * as Yup from 'yup';

export const PermissionSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Permission Name is required'),
  description: Yup.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
});
