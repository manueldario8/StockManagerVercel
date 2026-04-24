import { useEffect, useState } from "react";
import { productsApi, type OnlyProduct } from "../api/endopoints/products";

export const useProducts = () => {
  const [products, setProducts] = useState<OnlyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token") ?? "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll(token);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };


  
    useEffect(() => { fetchProducts(); }, []);
  
    return { products, loading, error, refetch: fetchProducts };
  };