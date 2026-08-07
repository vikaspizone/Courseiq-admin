/**
 * Validation Constants for Permissions.
 * Defines validation schemas for permission forms.
 */

import * as Yup from 'yup';

export const getCreatePermissionSchema = (strings: any) => Yup.object().shape({
  code: Yup.string().required('Code is required'),
  name_en: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .required(strings.ERR_NAME_REQ || 'Permission Name is required'),
  name_hi: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .optional(),
  is_active: Yup.boolean().optional(),
});

export const getUpdatePermissionSchema = (strings: any) => Yup.object().shape({
  code: Yup.string().required('Code is required'),
  name_en: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .required(strings.ERR_NAME_REQ || 'Permission Name is required'),
  name_hi: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .optional(),
  is_active: Yup.boolean().optional(),
});

export const getDeletePermissionSchema = (strings?: any) => Yup.object().shape({
  id: Yup.string().required('Permission ID is required for deletion'),
});

export const getFetchPermissionSchema = (strings?: any) => Yup.object().shape({
  id: Yup.string().required('Permission ID is required to fetch details'),
});
