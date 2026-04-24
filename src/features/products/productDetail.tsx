import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesApi, type CategoryDetails } from "../../api/endopoints/categories";

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";

  const [category, setCategory] = useState<CategoryDetails | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await categoriesApi.getById(Number(id), token);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar la categoría");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;
  if (!category) return null;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate("/categories")}>← Volver</button>
        <h3 className="title-dash">{category.name}</h3>
      </div>

      <h4>Productos de la categoría</h4>

      {category.products.length === 0 ? (
        <p>Esta categoría no tiene productos todavía.</p>
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
            {category.products.map((product) => (
              <tr key={product.productCode}>
                <td>{product.productCode}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CategoryDetail;