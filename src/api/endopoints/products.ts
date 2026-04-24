import { apiClient } from "../auth/client";
import { API_ROUTES } from "../auth/config";
import { type CategoryName } from "./categories";

export interface CreateProductForm {
    providerCode: string;
    productCode: string;
    categories: CategoryName[];
    name: string;
    price: number;
    stock: number;
    image?: File;
}


export interface CreateProductRequest {
    providerCode: string;
    productCode: string;
    categoriesIds: number[];
    name: string;
    price: number;
    stock: number;
    image?: File;
}

export const mapToCreateProductRequest = (
    form: CreateProductForm
): CreateProductRequest => {
    return {
        providerCode: form.providerCode,
        productCode: form.productCode,
        categoriesIds: form.categories.map(c => c.id), 
        name: form.name,
        price: form.price,
        stock: form.stock,
        image: form.image,
    };
};

export interface CreatedProduct {
    id: number;
    providerCode: string;
    productCode: string;
    categories: CategoryName[];
    name: string;
    price: number;
    stock: number;
    urlPhoto: string;

}

export interface ProductToCategory {
    providerCode: string;
    productCode: string;
    name: string;
    price: number;
}

export interface ProductToStock {
    providerCode: string;
    productCode: string;
    name: string;
    stock: number;
}

export interface ProductToProvider {
    providerCode: string;
    productCode: string;
    name: string;
    price: number;
    stock: number;
}

export interface OnlyProduct {
    id: number;
    providerCode: string;
    productCode: string;
    name: string;
    price: number;
}

export interface UpdateProductForm {
    name: string;
    categories: CategoryName[];
    price: number;
    stock: number;
    image?: File;

}



export const productsApi = {
  create: (form: CreateProductForm, token: string) => {
    const request = mapToCreateProductRequest(form);

    const formData = new FormData();

    formData.append("providerCode", request.providerCode);
    formData.append("productCode", request.productCode);
    formData.append("name", request.name);
    formData.append("price", request.price.toString());
    formData.append("stock", request.stock.toString());

    request.categoriesIds.forEach(id => {
      formData.append("categoriesIds", id.toString());
    });

    if (request.image) {
      formData.append("image", request.image);
    }

    return apiClient<CreatedProduct>(API_ROUTES.products, {
      method: "POST",
      body: formData,
      token,
    });
  },


  getAll: (token: string) =>
    apiClient<OnlyProduct[]>(API_ROUTES.products, { token }),

  getById: (id: number, token: string) =>
    apiClient<OnlyProduct>(`${API_ROUTES.products}/${id}`, { token }),

  update: (id: number, data: UpdateProductForm, token: string) =>
    apiClient<OnlyProduct>(`${API_ROUTES.products}/${id}`, {
      method: "PUT",
      body: data, 
      token,
    }),

  delete: (id: number, token: string) =>
    apiClient<void>(`${API_ROUTES.products}/${id}`, {
      method: "DELETE",
      token,
    }),
};

