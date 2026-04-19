export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://3.12.103.229:5000";

export const API_ROUTES = {
  providers: "/api/provider",
  categories: "/api/category",
  products: "/api/product",
  orders: "/api/order",
  auth: "/api/auth",
  
} as const;