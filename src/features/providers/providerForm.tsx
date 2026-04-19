import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { providersApi, type CreateProvider } from "../../api/providers.ts";

interface ProviderFormProps {
  onSuccess: () => void;
}


const ProviderForm = ({ onSuccess }: ProviderFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";
  const isEditing = Boolean(id);

  const [form, setForm] = useState<CreateProvider>({ name: "", code: "" });
  const [loading, setLoading]     = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);

  useEffect(() => {
    if (!isEditing || !id) return;
    const fetch = async () => {
      try {
        const data = await providersApi.getById(Number(id), token);
        setForm({ name: data.name, code: data.code });
        onSuccess();
      } catch {
        toast.error("No se pudo cargar el proveedor");
        navigate("/providers");
      } finally {
        setLoadingData(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.code.trim()) {
      toast.error("Nombre y código son requeridos");
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await providersApi.update(Number(id), { name: form.name }, token);
        toast.success("Proveedor actualizado");
      } else {
        await providersApi.create(form, token);
        toast.success("Proveedor creado");
      }
      navigate("/providers");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <p>Cargando datos...</p>;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate("/providers")}>← Volver</button>
        <h3 className="title-dash">
          {isEditing ? "Editar proveedor" : "Nuevo proveedor"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", marginTop: "24px" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="code">Código</label>
          <input
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
            disabled={isEditing} 
            placeholder="Ej: PROV-01"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ej: Distribuidora Norte"
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" onClick={() => navigate("/providers")}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear proveedor"}
          </button>
        </div>

      </form>
    </>
  );
};

export default ProviderForm;