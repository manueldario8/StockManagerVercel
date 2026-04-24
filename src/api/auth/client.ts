import { API_BASE_URL } from "./config";
import { tokenStorage } from "./tokenStorage";

interface RequestOptions extends RequestInit {
   method?: string;
  headers?: HeadersInit;
  body?: any; 
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;
  const auth = tokenStorage.get();
  const finalToken = token ?? auth?.token;

  const isFormData = fetchOptions.body instanceof FormData;

  const headers: HeadersInit = {
    ...( !isFormData && { "Content-Type": "application/json" } ), 
    ...(finalToken && { Authorization: `Bearer ${finalToken}` }),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    body: isFormData
      ? fetchOptions.body
      : fetchOptions.body
      ? JSON.stringify(fetchOptions.body)
      : undefined,
  });

  if (response.status === 401) {
    tokenStorage.clear();
    window.dispatchEvent(new Event("auth:logout"));
    throw new Error("Sesión expirada");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error en la petición");
  }

  if (response.status === 204) return undefined as T;

  return response.json();
}