import { useState, useEffect } from 'react';
import { getCourseCategories } from '@/features/course_categories/api';
import { CourseCategory } from '@/features/course_categories/types';

export const useCourseFormState = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'media' | 'pricing'>('basic');
  const [contentLang, setContentLang] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCourseCategories(1, 100);
        setCategories(res.items || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  return { categories, activeTab, setActiveTab, contentLang, setContentLang };
};
