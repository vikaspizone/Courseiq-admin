/**
 * Course Categories Feature Types.
 * Defines TypeScript interfaces and types for course categories.
 */

export interface CourseCategoryTranslation {
  languageCode: string;
  title: string;
  description: string;
}

export interface CourseCategory {
  id: string;
  is_active?: boolean;
  parent_id?: string | null;
  title?: string;
  description?: string;
  translations?: CourseCategoryTranslation[];
  created_at?: string;
  updated_at?: string;
}

export interface CourseCategoryPayload {
  is_active: boolean;
  parent_id?: string | null;
  translations: CourseCategoryTranslation[];
}
