/**
 * Feature Types.
 * Defines TypeScript interfaces and types for the feature.
 */

export interface Translation {
  languageCode: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  code?: string;
  description?: string;
  permissions?: any[];
  is_active?: boolean;
  translations?: Translation[];
  created_at: string;
  updated_at?: string;
}

export interface RolePayload {
  name: string;
  code: string;
  description: string;
  is_active: boolean;
  permissions: string[];
  translations: {
    languageCode: string;
    name: string;
    description: string;
  }[];
}
