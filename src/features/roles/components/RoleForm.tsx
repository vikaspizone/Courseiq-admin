'use client';

/**
 * Role Form Component.
 * Provides a form for creating and editing roles.
*/

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormInput } from '../../common/components/FormInput';
import { Role } from '../types';
import { ArrowLeft, Save, User, FileText, Shield, Lightbulb, LayoutDashboard, BookOpen, Users, UserSquare, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRoleForm } from '../hooks/useRoleForm';
import { usePermissionList } from '@/features/permissions/hooks/usePermissionList';
import { useModuleList } from '@/features/modules/hooks/useModuleList';
import { RoleSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { ROLE_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface RoleFormProps {
  initialData?: Role;
}

export const RoleForm: React.FC<RoleFormProps> = ({ initialData }) => {
  const { isEditing, handleSubmit } = useRoleForm(initialData);
  const { language } = useLanguage();
  const strings = ROLE_STRINGS[language];
  const { permissions: apiPermissions, loading: permissionsLoading } = usePermissionList();
  const { modules, loading: modulesLoading } = useModuleList();
  const activeModules = modules.filter(m => m.is_active);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          href={ROUTES.ROLE}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.BACK_TO_ROLES}
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? strings.EDIT_TITLE : strings.CREATE_TITLE}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isEditing ? strings.EDIT_DESC : strings.CREATE_NEW_ROLE_DESC}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <Formik
            initialValues={{
              name: initialData?.name || '',
              description: initialData?.description || '',
              is_active: initialData?.is_active ?? true,
            }}
            validationSchema={RoleSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, getFieldProps }) => (
              <Form className="space-y-8">
                
                {/* Role Name */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <User className="text-blue-500 w-6 h-6" />
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

                 {/* Status */}
                 <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                     <Settings className="text-blue-500 w-6 h-6" />
                   </div>
                   <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <Field
                         as="select"
                         name="is_active"
                         className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-700"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </Field>
                      <ErrorMessage name="is_active" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                   </div>
                 </div>


                {/* Permissions */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       {strings.LABEL_PERMISSIONS} <span className="text-red-500">*</span>
                     </label>
                     <p className="text-sm text-gray-500 mb-4">
                       {strings.DESC_PERMISSIONS}
                     </p>
                     
                     <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
                            <tr>
                              <th className="px-4 py-3">{strings.TH_MODULE}</th>
                              {permissionsLoading ? (
                                <th className="px-4 py-3 text-center text-gray-400">Loading...</th>
                              ) : (
                                apiPermissions.map((p) => (
                                  <th key={p.id} className="px-4 py-3 text-center">
                                    {p.name || (p.translations && p.translations.length > 0 ? p.translations[0].name : 'Unnamed')}
                                  </th>
                                ))
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {modulesLoading ? (
                              <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-500">Loading modules...</td></tr>
                            ) : activeModules.length === 0 ? (
                              <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-500">No active modules found</td></tr>
                            ) : (
                              activeModules.map((module) => {
                                const moduleName = module.translations?.find(t => t.languageCode === language)?.name 
                                  || module.translations?.[0]?.name 
                                  || module.name 
                                  || 'Unnamed';
                                  
                                return (
                                  <tr key={module.id} className="bg-white">
                                    <td className="px-4 py-3 flex items-center gap-2 font-medium text-gray-700">
                                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                                      {moduleName}
                                    </td>
                                    {permissionsLoading ? (
                                      <td className="px-4 py-3 text-center">...</td>
                                    ) : (
                                      apiPermissions.map((p) => (
                                        <td key={p.id} className="px-4 py-3 text-center">
                                            <input 
                                              type="checkbox" 
                                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                      ))
                                    )}
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                     </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8 pt-6">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 h-10 py-2 px-6 shadow-sm transition-colors"
                  >
                    {strings.CANCEL}
                  </button>
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
                        {strings.SAVE_ROLE}
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

