import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { providersApi, type ProviderWithProduct } from "../../api/endopoints/providers";

const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";

  const [provider, setProvider] = useState<ProviderWithProduct | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await providersApi.getById(Number(id), token);
        setProvider(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar proveedor");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;
  if (!provider) return null;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate("/providers")}>← Volver</button>
        <h3 className="title-dash">{provider.name}</h3>
        <span style={{ color: "gray", fontSize: "14px" }}>#{provider.code}</span>
      </div>

      <h4>Productos del proveedor</h4>

      {provider.products.length === 0 ? (
        <p>Este proveedor no tiene productos asociados.</p>
      ) : (
        <table className="main-table-container">
          <thead className="theadpv">
            <tr className="tuer">
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {provider.products.map((product) => (
              <tr key={product.productCode}>
                <td>{product.productCode}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProviderDetailPage;