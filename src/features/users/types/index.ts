/**
 * index Types.
 * Provides index functionality for the feature.
 */

export interface UserQualification {
  degree: string;
  year: number;
}

export interface UserAddress {
  city: string;
  country: string;
}

export interface UserWork {
  company: string;
  title: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | string;
  profile_image?: string;
  password?: string;
  about?: string;
  dateOfBirth?: string;
  is_active?: boolean;
  isActive?: boolean;
  qualification?: UserQualification;
  experience?: number | string;
  languages?: string[];
  address?: UserAddress;
  work?: UserWork;
  role_id?: string;
  role?: {
    id?: string;
    name: string;
    is_active?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type UserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
