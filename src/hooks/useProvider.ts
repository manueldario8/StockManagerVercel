import { useEffect, useState } from "react";
import { providersApi, type OnlyProvider } from "../api/endopoints/providers";

export const useProviders = () => {
  const [providers, setProviders] = useState<OnlyProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token") ?? "";

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await providersApi.getAll(token);
      setProviders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar proveedores");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      await providersApi.toggleStatus(id, token);
      setProviders(prev =>
        prev.map(p => p.id === id ? { ...p, statusActived: !p.statusActived } : p)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar estado");
    }
  };

  useEffect(() => { fetchProviders(); }, []);

  return { providers, loading, error, toggleStatus, refetch: fetchProviders };
};