import { apiClient } from "./client";
import { API_ROUTES } from "./config";

export interface OnlyCategory {
    id:number;
    name: string;
    statusActived: boolean;
}

export interface CategoryName {
    id:number;
    name: string;
}

export interface ProductToCategory {
    providerCode: string;
    productCode: string;
    name: string;
    price: number;
}

export interface CategoryDetails {
    id:number;
    name: string;
    products: ProductToCategory[];
}

export const categoriesApi = {

  getAll: (token: string) =>
    apiClient<OnlyCategory[]>(API_ROUTES.categories, { token }),

  getById: (id: number, token: string) =>
    apiClient<CategoryDetails>(`${API_ROUTES.categories}/${id}`, { token }),

  create: (data: OnlyCategory, token: string) =>
  apiClient<OnlyCategory>(API_ROUTES.categories, {
    method: "POST",
    body: JSON.stringify(data),
    token,
  }),

  update: (id: number, data: CategoryName, token: string) =>
    apiClient<OnlyCategory>(`${API_ROUTES.categories}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      token,
    }),

  toggleStatus: (id: number, token: string) =>
  apiClient<void>(`${API_ROUTES.categories}/toggle/${id}`, {
    method: "PATCH",
    token,
  })
};