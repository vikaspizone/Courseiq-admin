'use client';

/**
 * Module Form Component.
 * Provides a form for creating and editing modules.
*/

import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik';
import { Module } from '../types';
import { ArrowLeft, Save, Key, FileText, Lightbulb, LayoutDashboard, BookOpen, Users, Shield, UserSquare, Plus, Info, X } from 'lucide-react';
import Link from 'next/link';
import { useModuleForm } from '../hooks/useModuleForm';
import { useModuleList } from '../hooks/useModuleList';
import { getCreateModuleSchema, getUpdateModuleSchema } from '../validation';
import { useLanguage } from '@/features/common/lang/contexts/LanguageContext';
import { MODULE_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface ModuleFormProps {
  initialData?: Module;
}

export const ModuleForm: React.FC<ModuleFormProps> = ({ initialData }) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [isRouteManuallySet, setIsRouteManuallySet] = useState(false);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
  const { isEditing, handleSubmit } = useModuleForm(initialData);
  const { modules, loading } = useModuleList();
  const { language } = useLanguage();
  const strings = MODULE_STRINGS[language];

  const allRoutes = Object.values(ROUTES);
  
  const createdModuleRoutes = modules.map(m => {
    if (m.route) {
      let r = m.route.toLowerCase();
      return r.startsWith('/') ? r : '/' + r;
    }
    // Fallback for older modules
    let val = m.name || '';
    if (!val && m.translations) {
      const en = m.translations.find(t => t.languageCode === 'en');
      if (en) val = en.name;
    }
    if (val) {
      let slug = val.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
      if (slug.endsWith('ies')) {
        slug = slug.slice(0, -3) + 'y';
      } else if (slug.endsWith('s') && !slug.endsWith('ss')) {
        slug = slug.slice(0, -1);
      }
      return '/' + slug;
    }
    return '';
  }).filter(Boolean);

  const unassignedRoutes = allRoutes.filter(route => {
    if (route.startsWith('/auth')) return false;
    let normalizedRoute = route.toLowerCase();
    if (!normalizedRoute.startsWith('/')) normalizedRoute = '/' + normalizedRoute;
    
    const isAssigned = createdModuleRoutes.some(createdRoute => 
      normalizedRoute === createdRoute || normalizedRoute.startsWith(createdRoute + '/')
    );
    return !isAssigned;
  });

  // Dummy modules list just to show some checkboxes like role form
  const modulesList = [
    { module: 'Dashboard', icon: LayoutDashboard },
    { module: 'Courses', icon: BookOpen },
    { module: 'Users', icon: Users },
    { module: 'Roles', icon: Shield },
    { module: 'Instructor Directory', icon: UserSquare },
  ];

  const getTranslationName = (langCode: string) => {
    if (!initialData?.translations) return '';
    const t = initialData.translations.find(x => x.languageCode === langCode);
    return t ? t.name : '';
  };

  const initNameEn = getTranslationName('en') || initialData?.name || '';
  const initNameHi = getTranslationName('hi') || '';

  const handleAutoFill = (route: string) => {
    if (formikRef.current) {
      const namePart = route.replace(/^\//, '');
      const generatedName = namePart
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      formikRef.current.setFieldValue('name_en', generatedName);
      formikRef.current.setFieldValue('route', route);
      setIsRouteManuallySet(true);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Link
          href={ROUTES.MODULE}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.BACK_TO_MODULES}
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
              name_en: initNameEn,
              name_hi: initNameHi,
              is_active: initialData?.is_active ?? true,
              icon: initialData?.icon || '',
              route: initialData?.route || '',
            }}
            validationSchema={isEditing ? getUpdateModuleSchema(strings) : getCreateModuleSchema(strings)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Module Name (English) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Key className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_NAME} (English) <span className="text-red-500">*</span>
                       </label>
                       <Field name="name_en">
                         {({ field, form }: any) => (
                           <input
                             {...field}
                             placeholder={strings.PLACEHOLDER_NAME}
                             className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                             onChange={(e) => {
                               field.onChange(e);
                               if (!isEditing && !isRouteManuallySet) {
                                 const val = e.target.value;
                                 if (val) {
                                   let slug = val.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
                                   if (slug.endsWith('ies')) {
                                     slug = slug.slice(0, -3) + 'y';
                                   } else if (slug.endsWith('s') && !slug.endsWith('ss')) {
                                     slug = slug.slice(0, -1);
                                   }
                                   const autoRoute = '/' + slug;
                                   form.setFieldValue('route', autoRoute);
                                 } else {
                                   form.setFieldValue('route', '');
                                 }
                               }
                             }}
                           />
                         )}
                       </Field>
                       <ErrorMessage name="name_en" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Module Name (Hindi) */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <Key className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_NAME} (Hindi)
                       </label>
                       <Field
                          name="name_hi"
                          placeholder={strings.PLACEHOLDER_NAME}
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                       <ErrorMessage name="name_hi" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>
                </div>

                {/* Icon & Route */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Icon */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <FileText className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <label className="text-sm font-medium text-gray-700 block mb-1">
                         {strings.LABEL_ICON}
                       </label>
                       <Field
                          name="icon"
                          placeholder="e.g. LayoutDashboard"
                          className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                       />
                       <ErrorMessage name="icon" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                      <FileText className="text-blue-500 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                         <label className="text-sm font-medium text-gray-700">
                           {strings.LABEL_ROUTE}
                         </label>
                         <button 
                           type="button" 
                           onClick={() => setIsTipsModalOpen(true)} 
                           className="text-orange-500 hover:text-orange-600 transition-colors"
                           title="Route Path Tips"
                         >
                           <Info className="w-4 h-4" />
                         </button>
                       </div>
                       <Field name="route">
                         {({ field, form }: any) => (
                           <input
                             {...field}
                             placeholder="e.g. /dashboard"
                             className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                             onChange={(e) => {
                               field.onChange(e);
                               setIsRouteManuallySet(true);
                             }}
                           />
                         )}
                       </Field>
                       <ErrorMessage name="route" component="div" className="text-[0.8rem] font-medium text-red-500 mt-1" />
                    </div>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="text-blue-500 w-6 h-6" />
                  </div>
                  <div className="flex-1">
                     <label className="text-sm font-medium text-gray-700 block mb-1">
                       Status
                     </label>
                     <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-max">
                        <Field
                          type="checkbox"
                          name="is_active"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Active</span>
                     </label>
                  </div>
                </div>



                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8 pt-6">
                  <Link
                    href={ROUTES.MODULE}
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
                        {strings.SAVE_MODULE}
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
            <li>{strings.TIP_4}</li>
          </ul>
          </div>

          {/* Unassigned Routes Sidebar */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-medium">
              <FileText className="w-5 h-5" />
              {strings.UNASSIGNED_ROUTES}
            </div>
            {loading ? (
              <p className="text-sm text-gray-500 animate-pulse">{strings.LOADING_ROUTES}</p>
            ) : unassignedRoutes.length > 0 ? (
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {unassignedRoutes.map((route, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors group">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                      <code className="text-xs bg-gray-50 px-1.5 py-0.5 rounded text-gray-700 font-mono truncate">
                        {route}
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAutoFill(route)}
                      className="ml-2 shrink-0 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Auto-fill form"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">{strings.ALL_ROUTES_ASSIGNED}</p>
            )}
          </div>
        </div>

      </div>

      {/* Tips Modal */}
      {isTipsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden flex flex-col scale-in-center">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-800">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                {strings.ROUTE_TIPS_TITLE}
              </h3>
              <button 
                type="button"
                onClick={() => setIsTipsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 text-sm text-gray-600 leading-relaxed">
              <p className="mb-3" dangerouslySetInnerHTML={{ __html: strings.ROUTE_TIPS_DESC_1.replace('/dashboard', '<code>/dashboard</code>').replace('Route Path', '<strong>Route Path</strong>').replace('रूट पथ (Route Path)', '<strong>रूट पथ (Route Path)</strong>') }}></p>
              <p className="mb-3">{strings.ROUTE_TIPS_DESC_2}</p>
              <p className="mb-3">{strings.ROUTE_TIPS_DESC_3}</p>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-4 text-amber-800">
                <p className="font-semibold text-sm mb-1">{strings.ROUTE_TIPS_NOTE_TITLE}</p>
                <p>{strings.TIP_4}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button 
                type="button"
                onClick={() => setIsTipsModalOpen(false)} 
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                {strings.ROUTE_TIPS_GOT_IT}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

