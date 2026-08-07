'use client';

/**
 * User Form Component.
 * Provides a form for creating and editing users.
*/

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { User } from '../types';
import { ArrowLeft, Save, User as UserIcon, Mail, Shield, Settings, Phone, Lock, Eye, FileText, Camera, Calendar, Briefcase, GraduationCap, MapPin, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import { useUserForm } from '../hooks/useUserForm';
import { UserSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { USER_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface UserFormProps {
  initialData?: User;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const { isEditing, handleSubmit, roles } = useUserForm(initialData);
  const { language } = useLanguage();
  const strings = USER_STRINGS[language];

  const roleOptions = roles.map(r => ({ value: r.id, label: r.name }));
  const statusOptions = [
    { value: 'active', label: strings.STATUS_ACTIVE },
    { value: 'inactive', label: strings.STATUS_INACTIVE },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href={ROUTES.USER}
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {strings.BACK_TO_USERS}
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">
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
            role_id: initialData?.role_id || '',
            is_active: initialData?.is_active ?? true,
            phone: initialData?.phone || '',
            password: '',
            about: initialData?.about || '',
            gender: initialData?.gender || 'male',
            date_of_birth: initialData?.date_of_birth || '',
            experience: initialData?.experience || 0,
            qualification: {
              degree: initialData?.qualification?.degree || '',
              year: initialData?.qualification?.year || new Date().getFullYear()
            },
            address: {
              city: initialData?.address?.city || '',
              country: initialData?.address?.country || ''
            },
            work: {
              company: initialData?.work?.company || '',
              title: initialData?.work?.title || ''
            }
          }}
          validationSchema={UserSchema} // Might need to update validation schema later
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col lg:flex-row gap-8">
              
              {/* Profile Image Section */}
              <div className="w-full lg:w-64 shrink-0">
                <div className="text-sm font-medium text-gray-700 text-center mb-4 bg-white relative z-10 w-max mx-auto px-2">{strings.PROFILE_IMAGE}</div>
                <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-blue-50/30 -mt-6 pt-10">
                  <div className="relative mb-4 mt-2">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="w-10 h-10 text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
                      <Camera className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{strings.UPLOAD_PICTURE}</h3>
                  <p className="text-xs text-gray-500 mb-4">{strings.IMAGE_HINT}</p>
                  <button type="button" className="text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 rounded-md px-4 py-2 text-sm font-medium transition-colors w-full">
                    {strings.CHOOSE_IMAGE}
                  </button>
                </div>
              </div>

              {/* User Information Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">{strings.USER_INFO}</h3>
                  <div className="flex-1 h-px bg-gray-100 ml-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  
                  {/* Full Name */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <UserIcon className="text-blue-500 w-5 h-5" />
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

                  {/* Email Address */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Mail className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_EMAIL} <span className="text-red-500">*</span>
                       </label>
                       <Field
                          name="email"
                          type="email"
                          placeholder={strings.PLACEHOLDER_EMAIL}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                       <ErrorMessage name="email" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-2">
                         <label className="text-sm font-medium text-gray-700">
                           {strings.LABEL_ROLE} <span className="text-red-500">*</span>
                         </label>
                         <Link href={ROUTES.ROLE_CREATE} className="inline-flex items-center justify-center rounded-md text-xs font-medium border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 h-8 py-1.5 px-3 shadow-sm transition-colors">
                           <Shield className="w-3 h-3 mr-1.5" />
                           {strings.ADD_ROLE}
                         </Link>
                       </div>
                       <Field
                          as="select"
                          name="role_id"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-700"
                       >
                         <option value="" disabled>{strings.SELECT_ROLE}</option>
                         {roleOptions.map((opt: any) => (
                           <option key={opt.value} value={opt.value}>{opt.label}</option>
                         ))}
                       </Field>
                       <ErrorMessage name="role_id" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Settings className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_STATUS} <span className="text-red-500">*</span>
                       </label>
                       <Field
                          as="select"
                          name="is_active"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-700"
                       >
                         <option value="true">{strings.STATUS_ACTIVE}</option>
                         <option value="false">{strings.STATUS_INACTIVE}</option>
                       </Field>
                       <ErrorMessage name="is_active" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Phone className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_PHONE}
                       </label>
                       <Field
                          name="phone"
                          placeholder="e.g. +1 234 567 8900"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                    </div>
                  </div>

                  {/* Password */}
                  {!isEditing && (
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Lock className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_PASSWORD} <span className="text-red-500">*</span>
                       </label>
                       <div className="relative">
                         <Field
                            name="password"
                            type="password"
                            placeholder={strings.PLACEHOLDER_PASSWORD}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 pr-10"
                         />
                         <button type="button" className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                           <Eye className="w-4 h-4" />
                         </button>
                       </div>
                       <ErrorMessage name="password" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>
                  )}

                  {/* About */}
                  <div className="flex gap-3 items-start col-span-1 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <FileText className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_ABOUT}
                       </label>
                       <Field
                          as="textarea"
                          name="about"
                          rows={3}
                          placeholder={strings.PLACEHOLDER_ABOUT}
                          className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none"
                       />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Users className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_GENDER}
                       </label>
                       <Field
                          as="select"
                          name="gender"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-700"
                       >
                         <option value="male">{strings.OPTION_MALE}</option>
                         <option value="female">{strings.OPTION_FEMALE}</option>
                         <option value="other">{strings.OPTION_OTHER}</option>
                       </Field>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Calendar className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_DOB}
                       </label>
                       <Field
                          type="date"
                          name="date_of_birth"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-gray-700"
                       />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Briefcase className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_EXPERIENCE}
                       </label>
                       <Field
                          type="number"
                          name="experience"
                          placeholder={strings.PLACEHOLDER_EXPERIENCE}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Globe className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_LANGUAGES}
                       </label>
                       <Field
                          type="text"
                          name="languages"
                          placeholder={strings.PLACEHOLDER_LANGUAGES}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="flex gap-3 items-start col-span-1 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <GraduationCap className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_DEGREE}</label>
                         <Field
                            name="qualification.degree"
                            placeholder={strings.PLACEHOLDER_DEGREE}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_GRAD_YEAR}</label>
                         <Field
                            type="number"
                            name="qualification.year"
                            placeholder={strings.PLACEHOLDER_YEAR}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-3 items-start col-span-1 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <MapPin className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_CITY}</label>
                         <Field
                            name="address.city"
                            placeholder={strings.PLACEHOLDER_CITY}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_COUNTRY}</label>
                         <Field
                            name="address.country"
                            placeholder={strings.PLACEHOLDER_COUNTRY}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="flex gap-3 items-start col-span-1 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Briefcase className="text-blue-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_COMPANY}</label>
                         <Field
                            name="work.company"
                            placeholder={strings.PLACEHOLDER_COMPANY}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                       <div>
                         <label className="text-sm font-medium text-gray-700 block mb-1">{strings.LABEL_JOB_TITLE}</label>
                         <Field
                            name="work.title"
                            placeholder={strings.PLACEHOLDER_TITLE}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                         />
                       </div>
                    </div>
                  </div>

                </div>

                <div className="pt-8 flex justify-end gap-3 border-t border-gray-100 mt-8">
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
                        {strings.SAVE_USER}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
