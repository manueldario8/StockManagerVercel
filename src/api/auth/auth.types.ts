export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string; 
  role: string;
}

export interface AuthState {
  token: string;
  role: string;
  expiresAt: string;
}