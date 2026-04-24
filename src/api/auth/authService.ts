import { apiClient } from "./client";
import { tokenStorage } from "./tokenStorage";
import { API_ROUTES } from "./config";
import type { AuthResponse, Login } from "./auth.types";

export const authService = {
  async login(dto: Login): Promise<AuthResponse> {
    const response = await apiClient<AuthResponse>(
      `${API_ROUTES.auth}/login`,
      {
        method: "POST",
        body: JSON.stringify(dto),
      }
    );

    tokenStorage.save({
      token: response.token,
      expiresAt: response.expiresAt,
      role: response.role,
    });

    return response;
  },

  logout() {
    tokenStorage.clear();
  },

  getToken(): string | null {
    return tokenStorage.get()?.token ?? null;
  },
};