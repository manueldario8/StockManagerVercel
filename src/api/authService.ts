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