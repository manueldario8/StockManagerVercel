export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const API_ROUTES = {
  providers: "/api/provider",
  categories: "/api/category",
  products: "/api/product",
  orders: "/api/order",
  auth: "/api/auth",
  users: "/api/users", 
  
} as const;