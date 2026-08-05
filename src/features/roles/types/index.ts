/**
 * Feature Types.
 * Defines TypeScript interfaces and types for the feature.
 */

export interface Role {
  id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
}
