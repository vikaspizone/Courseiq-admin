/**
 * Validation Constants for Modules.
 * Defines validation schemas for module forms.
 */

import * as Yup from 'yup';

export const getCreateModuleSchema = (strings: any) => Yup.object().shape({
  name_en: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .required(strings.ERR_NAME_REQ || 'Module Name is required'),
  name_hi: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .optional(),
  is_active: Yup.boolean().optional(),
});

export const getUpdateModuleSchema = (strings: any) => Yup.object().shape({
  name_en: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .required(strings.ERR_NAME_REQ || 'Module Name is required'),
  name_hi: Yup.string()
    .min(2, strings.ERR_NAME_MIN || 'Name is too short!')
    .max(50, strings.ERR_NAME_MAX || 'Name is too long!')
    .optional(),
  is_active: Yup.boolean().optional(),
});

export const getDeleteModuleSchema = (strings?: any) => Yup.object().shape({
  id: Yup.string().required('Module ID is required for deletion'),
});

export const getFetchModuleSchema = (strings?: any) => Yup.object().shape({
  id: Yup.string().required('Module ID is required to fetch details'),
});
