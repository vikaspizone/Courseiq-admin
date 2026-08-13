'use client';

/**
 * Course Form Component
 * Tabbed interface for creating/editing courses.
 */
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Course } from '../types';
import { ArrowLeft, Save, FileText, Lightbulb, Link as LinkIcon, DollarSign, BookOpen, ImageIcon, Settings, Globe, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCourseForm } from '../hooks/useCourseForm';
import { useCourseFormState } from '../hooks/useCourseFormState';
import { getCourseSchema } from '../validation';
import { COURSE_STRINGS } from '../constants';
import { ROUTES } from '@/features/common/constants/routes';

interface CourseFormProps {
  initialData?: Course;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData }) => {
  const { categories, activeTab, setActiveTab, contentLang, setContentLang } = useCourseFormState();

  const { isEditing, handleSubmit } = useCourseForm(initialData);
  const strings = COURSE_STRINGS['en']; // Hardcoding 'en' for now

  const getTranslationData = (langCode: string, field: 'title' | 'description' | 'overview') => {
    if (initialData?.translations && initialData.translations.length > 0) {
      const t = initialData.translations.find(x => x.languageCode === langCode);
      if (t && t[field]) return t[field];
    }
    if (langCode === 'en' && initialData) {
      return (initialData as any)[field] || '';
    }
    return '';
  };

  const formatDateTimeLocal = (dateString: string | undefined | null) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    } catch {
      return '';
    }
  };

  const initialPrice = (initialData as any)?.price;
  const initialPricesArray = initialPrice 
    ? [{
        ...initialPrice,
        discount_start_at: formatDateTimeLocal(initialPrice.discount_start_at),
        discount_end_at: formatDateTimeLocal(initialPrice.discount_end_at),
      }] 
    : (initialData?.prices?.length 
        ? initialData.prices 
        : [{ currency: 'INR', price: 0, discount_price: 0, discount_type: 'none', discount_value: 0, discount_start_at: '', discount_end_at: '' }]);

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Settings },
    { id: 'media', label: 'Media & Topics', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Link href={ROUTES.COURSE} className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          {strings.BACK_TO_COURSES}
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

      <Formik
        initialValues={{
          category_id: initialData?.category_id || '',
          type: initialData?.type || 'free',
          level: initialData?.level || 'beginner',
          slug: initialData?.slug || '',
          language: initialData?.language || 'en',
          status: initialData?.status || 'draft',
          
          title_en: getTranslationData('en', 'title'),
          description_en: getTranslationData('en', 'description'),
          overview_en: getTranslationData('en', 'overview'),
          
          title_hi: getTranslationData('hi', 'title'),
          description_hi: getTranslationData('hi', 'description'),
          overview_hi: getTranslationData('hi', 'overview'),
          
          thumbnail: initialData?.thumbnail || '',
          image: initialData?.image || '',
          topics: initialData?.topics ? JSON.stringify(initialData.topics, null, 2) : '{}',
          
          prices: initialPricesArray,
        }}
        validationSchema={getCourseSchema(strings)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Main Form Area */}
            <div className="flex-1 w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Tabs Navigation */}
              <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                        activeTab === tab.id 
                          ? 'border-blue-600 text-blue-600 bg-white' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8 space-y-8">
                
                {/* --- TAB 1: BASIC INFO --- */}
                <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Title (English) *</label>
                        <Field name="title_en" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Description (English)</label>
                        <Field as="textarea" rows={3} name="description_en" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Overview (English)</label>
                        <Field as="textarea" rows={5} name="overview_en" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Title (Hindi)</label>
                        <Field name="title_hi" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Description (Hindi)</label>
                        <Field as="textarea" rows={3} name="description_hi" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Overview (Hindi)</label>
                        <Field as="textarea" rows={5} name="overview_hi" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Category *</label>
                      <Field as="select" name="category_id" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                           <option key={cat.id} value={cat.id}>
                             {cat.translations?.find(t => t.languageCode === 'en')?.title || cat.title}
                           </option>
                        ))}
                      </Field>
                      <ErrorMessage name="category_id" component="div" className="text-xs text-red-500 mt-1" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Slug *</label>
                      <Field name="slug" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. react-basics" />
                      <ErrorMessage name="slug" component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Course Type *</label>
                      <Field as="select" name="type" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </Field>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Level *</label>
                      <Field as="select" name="level" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </Field>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Status *</label>
                      <Field as="select" name="status" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </Field>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Primary Language *</label>
                      <Field as="select" name="language" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                      </Field>
                    </div>
                  </div>
                </div>



                {/* --- TAB 3: MEDIA & TOPICS --- */}
                <div className={activeTab === 'media' ? 'block' : 'hidden'}>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Thumbnail URL</label>
                      <Field name="thumbnail" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Cover Image URL</label>
                      <Field name="image" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1 flex justify-between">
                        <span>Topics (JSON)</span>
                        <span className="text-gray-400 font-normal">Valid JSON format required</span>
                      </label>
                      <Field as="textarea" rows={6} name="topics" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                    </div>
                  </div>
                </div>

                {/* --- TAB 4: PRICING --- */}
                <div className={activeTab === 'pricing' ? 'block' : 'hidden'}>
                  {values.type === 'free' ? (
                    <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 mt-0.5" />
                      <p>This course is currently set to <strong>Free</strong> in the Basic Info tab. Pricing options are not applicable.</p>
                    </div>
                  ) : (
                    <FieldArray name="prices">
                      {({ push, remove }) => (
                        <div className="space-y-6">
                          {values.prices.length === 0 && (
                            <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl">
                              <p className="text-gray-500 mb-4">No pricing plans added yet.</p>
                              <button type="button" onClick={() => push({ currency: 'INR', price: 0, discount_price: 0, discount_type: 'none', discount_value: 0, discount_start_at: '', discount_end_at: '' })} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                                <Plus className="w-4 h-4 inline mr-1" /> Add Pricing Plan
                              </button>
                            </div>
                          )}
                          
                          {values.prices.map((price, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-5 relative bg-gray-50/30">
                              <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                <Trash2 className="w-4 h-4" />
                              </button>
                              
                              <h4 className="font-semibold text-gray-800 mb-4">Pricing Plan #{index + 1}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Currency</label>
                                  <Field name={`prices.${index}.currency`} as="select" className="w-full rounded-md border border-gray-200 p-2 text-sm">
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                  </Field>
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Base Price</label>
                                  <Field type="number" name={`prices.${index}.price`} className="w-full rounded-md border border-gray-200 p-2 text-sm" />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Final/Discount Price</label>
                                  <Field type="number" name={`prices.${index}.discount_price`} className="w-full rounded-md border border-gray-200 p-2 text-sm" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Discount Type</label>
                                  <Field name={`prices.${index}.discount_type`} as="select" className="w-full rounded-md border border-gray-200 p-2 text-sm">
                                    <option value="fixed">Fixed</option>
                                    <option value="percentage">Percentage</option>
                                  </Field>
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Discount Value</label>
                                  <Field type="number" name={`prices.${index}.discount_value`} className="w-full rounded-md border border-gray-200 p-2 text-sm" />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">Start Date</label>
                                  <Field type="datetime-local" name={`prices.${index}.discount_start_at`} className="w-full rounded-md border border-gray-200 p-2 text-sm" />
                                </div>
                                <div>
                                  <label className="text-xs text-gray-600 block mb-1">End Date</label>
                                  <Field type="datetime-local" name={`prices.${index}.discount_end_at`} className="w-full rounded-md border border-gray-200 p-2 text-sm" />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {values.prices.length > 0 && (
                            <button type="button" onClick={() => push({ currency: 'INR', price: 0, discount_price: 0, discount_type: 'none', discount_value: 0, discount_start_at: '', discount_end_at: '' })} className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                              <Plus className="w-4 h-4 mr-1" /> Add another pricing plan
                            </button>
                          )}
                        </div>
                      )}
                    </FieldArray>
                  )}
                </div>

                {/* Form Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8">
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-8 shadow-sm">
                    {isSubmitting ? 'Saving...' : (
                      <><Save className="w-4 h-4 mr-2" /> {strings.SAVE_COURSE}</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar Hints */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3 text-blue-800 font-semibold">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Tips for better courses
                </div>
                <ul className="space-y-3 text-sm text-blue-800/80">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"></span>
                    <span>Use a short, descriptive slug (e.g. <code>learn-react</code>). It will be used in the URL.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"></span>
                    <span>Provide high quality images. We recommend 1920x1080 for covers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"></span>
                    <span>Both English and Hindi titles help you reach a wider audience.</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};
