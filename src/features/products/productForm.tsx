import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { productsApi, type CreateProductForm } from "../../api/endopoints/products";

interface ProductFormProps {
  onSuccess: () => void;
}

const ProductForm = ({ onSuccess }: ProductFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";
  const isEditing = Boolean(id);

  const [form, setForm] = useState<CreateProductForm>({
    providerCode: "",
    productCode: "",
    categories: [],
    name: "",
    price: 0,
    stock: 0,
    image: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);

  useEffect(() => {
    if (!isEditing || !id) return;

    const fetch = async () => {
      try {
        const data = await productsApi.getById(Number(id), token);

        setForm(prev => ({
          ...prev,
          name: data.name,
          providerCode: data.providerCode,
          productCode: data.productCode,
          price: data.price ?? 0,
          // categories: ??? (depende de tu endpoint)
        }));

      } catch {
        toast.error("No se pudo cargar el producto");
        navigate("/");
      } finally {
        setLoadingData(false);
      }
    };

    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm(prev => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setForm(prev => ({
      ...prev,
      image: e.target.files![0],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Nombre requerido");
      return;
    }

    try {
      setLoading(true);

      
      onSuccess();
      navigate("/products");

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
        <button onClick={() => navigate("/products")}>← Volver</button>
        <h3 className="title-dash">
          {isEditing ? "Editar producto" : "Nuevo producto"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", marginTop: "24px" }}>

        <input name="providerCode" placeholder="Provider Code" value={form.providerCode} onChange={handleChange} />
        <input name="productCode" placeholder="Product Code" value={form.productCode} onChange={handleChange} />

        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />

        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />

        <input type="file" onChange={handleFileChange} />

        <div style={{ display: "flex", gap: "12px" }}>
          <button type="button" onClick={() => navigate("/products")}>
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>

      </form>
    </>
  );
};

export default ProductForm;