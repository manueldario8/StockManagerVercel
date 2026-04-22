import { apiClient } from "./client";
import { tokenStorage } from "./tokenStorage";
import { API_ROUTES } from "./config";
import type { AuthResponseDTO, LoginDTO } from "./auth.types";

export const authService = {
  async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const response = await apiClient<AuthResponseDTO>(
      `${API_ROUTES.auth}/login`,
      {
        method: "POST",
        body: JSON.stringify(dto),
      }
    );

    tokenStorage.save({
      token: response.token,
      expiresAt: response.expires,
      role: response.role,
    });

    return response;
  },

  logout() {
    tokenStorage.clear();
    
    window.dispatchEvent(new Event("auth:logout"));
  },

  getToken(): string | null {
    return tokenStorage.get()?.token ?? null;
  },

  getRole(): string | null {
    return tokenStorage.get()?.role ?? null;
  },

  isAuthenticated(): boolean {
    return !tokenStorage.isExpired();
  },
};