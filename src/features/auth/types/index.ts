/**
 * Authentication Types.
 * Defines TypeScript interfaces and types for the auth feature.
 */

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthUser extends User {
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
