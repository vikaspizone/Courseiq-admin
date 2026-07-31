/**
 * Feature Types.
 * Defines TypeScript interfaces and types for the feature.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName?: string; // computed field
  status: 'active' | 'inactive';
  createdAt: string;
  phone?: string;
  about?: string;
}
