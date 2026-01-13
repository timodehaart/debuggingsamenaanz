export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'researcher';
}

export interface LoginCredentials {
  email: string;
  password: string;
}