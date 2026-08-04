/**
 * Feature Types.
 * Defines TypeScript interfaces and types for the feature.
 */

export interface Role {
  id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
}
