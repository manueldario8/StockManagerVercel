import { apiClient } from "../auth/client";
import { API_ROUTES } from "../auth/config";
import { type ProductToStock, type ProductToProvider } from "./products";

export interface OnlyProvider {
  id: number;
  name: string;
  code: string;
  statusActived: boolean;
}


export interface ProviderWithProduct {
  name: string;
  code: string;
  products: ProductToProvider[];
}
export interface CreateProvider {
  name: string;
  code: string;
}
export interface CreatedProvider {
  id: number;
  name: string;
  code: string;
}
export interface UpdateProvider {
  name: string;
}
export interface ProviderStock {
  name: string;
  code: string;
  products: ProductToStock[];
}

export const providersApi = {

  getAll: (token: string) =>
    apiClient<OnlyProvider[]>(API_ROUTES.providers, { token }),

  getById: (id: number, token: string) =>
    apiClient<ProviderWithProduct>(`${API_ROUTES.providers}/${id}`, { token }),

  create: (data: CreateProvider, token: string) =>
    apiClient<CreatedProvider>(API_ROUTES.providers, {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  update: (id: number, data: UpdateProvider, token: string) =>
    apiClient<OnlyProvider>(`${API_ROUTES.providers}/${id}`, {
      method: "PUT",
      body: data,
      token,
    }),

  toggleStatus: (id: number, token: string) =>
    apiClient<void>(`${API_ROUTES.providers}/toggle/${id}`, {
      method: "PATCH",
      token,
    }),

  getStock: (id: number, token: string) =>
    apiClient<ProviderStock>(`${API_ROUTES.providers}/stock/${id}`, { token }),
};