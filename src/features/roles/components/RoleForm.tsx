'use client';

/**
 * Role Form Component.
 * Provides a form for creating and editing roles.
 */

import React from 'react';
import { Formik, Form } from 'formik';
import { FormInput } from '../../common/components/FormInput';
import { Role } from '../types';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRoleForm } from '../hooks/useRoleForm';
import { RoleSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { ROLE_STRINGS } from '../constants';

interface RoleFormProps {
  initialData?: Role;
}

export const RoleForm: React.FC<RoleFormProps> = ({ initialData }) => {
  const { isEditing, handleSubmit } = useRoleForm(initialData);
  const { language } = useLanguage();
  const strings = ROLE_STRINGS[language];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link
          href="/role"
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {isEditing ? strings.EDIT_TITLE : strings.CREATE_TITLE}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? strings.EDIT_DESC : strings.CREATE_DESC}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <Formik
          initialValues={{
            name: initialData?.name || '',
            description: initialData?.description || '',
          }}
          validationSchema={RoleSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
                <FormInput
                  name="name"
                  label={strings.LABEL_NAME}
                  placeholder={strings.PLACEHOLDER_NAME}
                />
                <FormInput
                  name="description"
                  label={strings.LABEL_DESC}
                  placeholder={strings.PLACEHOLDER_DESC}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-6 shadow-sm"
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
    </div>
  );
};
