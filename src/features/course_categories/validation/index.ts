import * as Yup from 'yup';

export const getCreateCategorySchema = (strings: any) => Yup.object().shape({
  title_en: Yup.string()
    .min(2, strings.ERR_TITLE_MIN)
    .max(100, strings.ERR_TITLE_MAX)
    .required(strings.ERR_TITLE_REQ),
  title_hi: Yup.string()
    .max(100, strings.ERR_TITLE_MAX),
  description_en: Yup.string()
    .max(500, strings.ERR_DESC_MAX)
    .nullable(),
  description_hi: Yup.string()
    .max(500, strings.ERR_DESC_MAX)
    .nullable(),
  is_active: Yup.boolean().optional()
});

export const getUpdateCategorySchema = (strings: any) => getCreateCategorySchema(strings);
