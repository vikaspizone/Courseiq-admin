/**
 * Course Management Types
 */

export interface CourseTranslation {
  languageCode: string;
  title: string;
  description: string;
  overview: string;
}

export interface CoursePrice {
  currency: string;
  price: number;
  discount_price: number;
  discount_type: string;
  discount_value: number;
  discount_start_at: string;
  discount_end_at: string;
}

export interface Course {
  id: string;
  category_id: string;
  type: string;
  level: string;
  slug: string;
  thumbnail: string;
  image: string;
  language: string;
  topics: any;
  status: string;
  translations: CourseTranslation[];
  prices: CoursePrice[];
  created_at?: string;
  updated_at?: string;
}

export interface CoursePayload {
  category_id: string;
  type: string;
  level: string;
  slug: string;
  thumbnail: string;
  image: string;
  language: string;
  topics: any;
  status: string;
  translations: CourseTranslation[];
  prices: CoursePrice[];
}
