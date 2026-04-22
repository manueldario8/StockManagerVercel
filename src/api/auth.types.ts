export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  expires: string; 
  role: string;
}

export interface AuthState {
  token: string;
  role: string;
  expiresAt: string;
}