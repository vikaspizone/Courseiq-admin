/**
 * Module Feature Types.
 * Defines TypeScript interfaces and types for modules.
 */

export interface Translation {
  id?: string;
  languageCode?: string;
  language_id?: string;
  name: string;
}

export interface Module {
  id: string;
  name?: string;
  is_active?: boolean;
  icon?: string;
  route?: string;
  translations?: Translation[];
  created_at: string;
  updated_at?: string;
}

export interface ModulePayload {
  is_active: boolean;
  icon?: string;
  route?: string;
  translations: {
    languageCode: string;
    name: string;
  }[];
}
