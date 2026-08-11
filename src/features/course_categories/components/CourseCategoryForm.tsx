'use client';

/**
 * Course Category Form Component.
 * Provides a form for creating and editing course categories with multi-language support.
 */

import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import { CourseCategory } from '../types';
import { ArrowLeft, Save, Lightbulb, FolderOpen, AlignLeft, LayoutList } from 'lucide-react';
import Link from 'next/link';
import { useCourseCategoryForm } from '../hooks/useCourseCategoryForm';
import { getCreateCategorySchema, getUpdateCategorySchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { COURSE_CATEGORY_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface CourseCategoryFormProps {
  initialData?: CourseCategory;
}

export const CourseCategoryForm: React.FC<CourseCategoryFormProps> = ({ initialData }) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const { isEditing, handleSubmit } = useCourseCategoryForm(initialData);
  const { language } = useLanguage();
  
  // Use English as fallback for type safety
  const strings = COURSE_CATEGORY_STRINGS[language as keyof typeof COURSE_CATEGORY_STRINGS] || COURSE_CATEGORY_STRINGS.en;

  const getTranslationData = (langCode: string, field: 'title' | 'description') => {
    if (initialData?.translations && initialData.translations.length > 0) {
      const t = initialData.translations.find(x => x.languageCode === langCode);
      if (t && t[field]) return t[field];
    }
    if (langCode === 'en' && initialData?.[field]) {
      return initialData[field];
    }
    return '';
  };

  const initTitleEn = getTranslationData('en', 'title') || '';
  const initTitleHi = getTranslationData('hi', 'title') || '';
  const initDescEn = getTranslationData('en', 'description') || '';
  const initDescHi = getTranslationData('hi', 'description') || '';

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          href={ROUTES.COURSE_CATEGORY}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.BACK_TO_CATEGORIES}
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? strings.EDIT_TITLE : strings.CREATE_TITLE}
        </h2>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          {isEditing ? strings.EDIT_DESC : strings.CREATE_DESC}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <Formik
            innerRef={formikRef}
            initialValues={{
              title_en: initTitleEn,
              title_hi: initTitleHi,
              description_en: initDescEn,
              description_hi: initDescHi,
              is_active: initialData?.is_active ?? true,
            }}
            validationSchema={isEditing ? getUpdateCategorySchema(strings) : getCreateCategorySchema(strings)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                
                {/* Titles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title (English) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <FolderOpen className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_TITLE} (English) <span className="text-red-500">*</span>
                       </label>
                       <Field
                          name="title_en"
                          placeholder={strings.PLACEHOLDER_TITLE}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                       <ErrorMessage name="title_en" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Title (Hindi) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <FolderOpen className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_TITLE} (Hindi)
                       </label>
                       <Field
                          name="title_hi"
                          placeholder={strings.PLACEHOLDER_TITLE}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                       <ErrorMessage name="title_hi" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description (English) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <AlignLeft className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_DESC} (English)
                       </label>
                       <Field
                          as="textarea"
                          name="description_en"
                          placeholder={strings.PLACEHOLDER_DESC}
                          rows={3}
                          className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                       />
                       <ErrorMessage name="description_en" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Description (Hindi) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <AlignLeft className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_DESC} (Hindi)
                       </label>
                       <Field
                          as="textarea"
                          name="description_hi"
                          placeholder={strings.PLACEHOLDER_DESC}
                          rows={3}
                          className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                       />
                       <ErrorMessage name="description_hi" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <LayoutList className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       Status
                     </label>
                     <div className="flex gap-4">
                       <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <Field
                            type="radio"
                            name="is_active"
                            value="true"
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                       </label>
                       <label className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <Field
                            type="radio"
                            name="is_active"
                            value="false"
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Inactive</span>
                       </label>
                     </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8 pt-6">
                  <Link
                    href={ROUTES.COURSE_CATEGORY}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 h-10 py-2 px-6 shadow-sm transition-colors"
                  >
                    {strings.CANCEL}
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-6 shadow-sm"
                  >
                    {isSubmitting ? (
                      strings.SAVING
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {strings.SAVE_CATEGORY}
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6 shrink-0">
          {/* Tips Sidebar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-medium">
              <Lightbulb className="w-5 h-5" />
              {strings.TIPS}
            </div>
            <ul className="space-y-3 text-sm text-gray-600 list-disc pl-4">
              <li>{strings.TIP_1}</li>
              <li>{strings.TIP_2}</li>
              <li>{strings.TIP_3}</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
