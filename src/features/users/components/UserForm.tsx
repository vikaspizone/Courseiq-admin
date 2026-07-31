'use client';

/**
 * User Form Component.
 * Provides a form for creating and editing users.
 */

import React from 'react';
import { Formik, Form } from 'formik';
import { FormInput } from '../../common/components/FormInput';
import { FormSelect } from '../../common/components/FormSelect';
import { User } from '../types';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useUserForm } from '../hooks/useUserForm';
import { UserSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';

interface UserFormProps {
  initialData?: User;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const { isEditing, handleSubmit, roles } = useUserForm(initialData);
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  const roleOptions = roles.map(r => ({ value: r.id, label: r.name }));
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link
          href="/user"
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
            email: initialData?.email || '',
            roleId: initialData?.roleId || '',
            status: initialData?.status || 'active',
          }}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="name"
                  label={strings.LABEL_NAME}
                  placeholder={strings.PLACEHOLDER_NAME}
                />
                <FormInput
                  name="email"
                  type="email"
                  label={strings.LABEL_EMAIL}
                  placeholder={strings.PLACEHOLDER_EMAIL}
                />
                <FormSelect
                  name="roleId"
                  label={strings.LABEL_ROLE}
                  options={roleOptions}
                  placeholder="Select a role"
                />
                <FormSelect
                  name="status"
                  label={strings.LABEL_STATUS}
                  options={statusOptions}
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
                      {strings.SAVE_USER}
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
