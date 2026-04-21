import { API_BASE_URL } from "./config";
import { tokenStorage } from "./tokenStorage";

interface RequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const authToken = token ?? tokenStorage.get()?.token;

  if (authToken && tokenStorage.isExpired()) {
    tokenStorage.clear();
    window.dispatchEvent(new Event("auth:expired"));
    throw new Error("Sesión expirada. Por favor iniciá sesión nuevamente.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401) {
    tokenStorage.clear();
    window.dispatchEvent(new Event("auth:expired"));
    throw new Error("No autorizado. Por favor iniciá sesión.");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message ?? `Error ${response.status}`);
  }

  // 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json();
}