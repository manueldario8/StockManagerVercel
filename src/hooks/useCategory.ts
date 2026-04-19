import { useEffect, useState } from "react";
import { categoriesApi, type OnlyCategory } from "../api/categories";

export const useCategories = () => {
  const [categories, setCategories] = useState<OnlyCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token") ?? "";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesApi.getAll(token);
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number) => {
      try {
        await categoriesApi.toggleStatus(id, token);
        setCategories(prev =>
          prev.map(p => p.id === id ? { ...p, statusActived: !p.statusActived } : p)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cambiar estado");
      }
    };
  
    useEffect(() => { fetchCategories(); }, []);
  
    return { categories, loading, error, toggleStatus, refetch: fetchCategories };
  };