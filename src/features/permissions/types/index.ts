/**
 * Permission Feature Types.
 * Defines TypeScript interfaces and types for permissions.
 */

export interface Translation {
  id?: string;
  languageCode?: string;
  language_id?: string;
  name: string;
}

export interface Permission {
  id: string;
  name?: string;
  code?: string;
  is_active?: boolean;
  translations?: Translation[];
  created_at: string;
  updated_at?: string;
}

export interface PermissionPayload {
  code: string;
  is_active: boolean;
  translations: {
    languageCode: string;
    name: string;
  }[];
}
