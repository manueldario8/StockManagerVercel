import { apiClient } from "../auth/client";
import { API_ROUTES } from "../auth/config";
import { type ProductToCategory } from "./products";

export interface OnlyCategory {
    id:number;
    name: string;
    statusActived: boolean;
}

export interface CreateCategory {
  name:string;
}

export interface CategoryName {
    id: number;
    name: string;
}

export interface UpdateCategory {
  name: string;
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

  create: (data: CreateCategory, token: string) =>
  apiClient<OnlyCategory>(API_ROUTES.categories, {
    method: "POST",
    body: JSON.stringify(data),
    token,
  }),

  update: (id: number, data: UpdateCategory, token: string) =>
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