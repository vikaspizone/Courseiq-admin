'use client';

/**
 * Permission Form Component.
 * Provides a form for creating and editing permissions.
*/

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Permission } from '../types';
import { ArrowLeft, Save, Key, FileText, Lightbulb, LayoutDashboard, BookOpen, Users, Shield, UserSquare } from 'lucide-react';
import Link from 'next/link';
import { usePermissionForm } from '../hooks/usePermissionForm';
import { PermissionSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { PERMISSION_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface PermissionFormProps {
  initialData?: Permission;
}

export const PermissionForm: React.FC<PermissionFormProps> = ({ initialData }) => {
  const { isEditing, handleSubmit } = usePermissionForm(initialData);
  const { language } = useLanguage();
  const strings = PERMISSION_STRINGS[language];

  // Dummy modules list just to show some checkboxes like role form
  const modulesList = [
    { module: 'Dashboard', icon: LayoutDashboard },
    { module: 'Courses', icon: BookOpen },
    { module: 'Users', icon: Users },
    { module: 'Roles', icon: Shield },
    { module: 'Instructor Directory', icon: UserSquare },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          href={ROUTES.PERMISSION}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.BACK_TO_PERMISSIONS}
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? strings.EDIT_TITLE : strings.CREATE_TITLE}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isEditing ? strings.EDIT_DESC : strings.CREATE_DESC}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <Formik
            initialValues={{
              name: initialData?.name || '',
              description: initialData?.description || '',
            }}
            validationSchema={PermissionSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                
                {/* Permission Name */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Key className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       {strings.LABEL_NAME} <span className="text-red-500">*</span>
                     </label>
                     <Field
                        name="name"
                        placeholder={strings.PLACEHOLDER_NAME}
                        className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                     />
                     <ErrorMessage name="name" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                  </div>
                </div>

                {/* Description */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <FileText className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       {strings.LABEL_DESC}
                     </label>
                     <Field
                        as="textarea"
                        name="description"
                        rows={3}
                        placeholder={strings.PLACEHOLDER_DESC}
                        className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                     />
                     <ErrorMessage name="description" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                  </div>
                </div>

                {/* Modules Selection (Mock) */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       {strings.LABEL_MODULES}
                     </label>
                     <p className="text-sm text-gray-500 mb-4">
                       {strings.DESC_MODULES}
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {modulesList.map((item, idx) => (
                           <label key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                              <input 
                                type="checkbox"
                                defaultChecked={idx % 2 === 0}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <item.icon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">{item.module}</span>
                           </label>
                        ))}
                     </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8 pt-6">
                  <Link
                    href={ROUTES.PERMISSION}
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
                        {strings.SAVE_PERMISSION}
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Tips Sidebar */}
        <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm border border-gray-100 shrink-0">
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
  );
};

