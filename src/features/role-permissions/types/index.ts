/**
 * Types.
 * Defines TypeScript interfaces and types for the feature.
 */
export interface RolePermissionPayload {
  role_id: string;
  module_id: string;
  permission_ids: string[];
}

export interface RolePermission extends RolePermissionPayload {
  id: string;
  created_at?: string;
  updated_at?: string;
}
