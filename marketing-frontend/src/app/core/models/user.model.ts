export type Role = 'ADMIN' | 'CM' | 'CLIENT';

export interface User {
  id?: number;
  username: string;
  email: string;
  fullName?: string;
  role: Role;
  enabled?: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  role?: Role;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: number;
  email: string;
  role: Role;
}
