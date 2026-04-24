import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, type Column, Modal } from "../../exports";
import { useProducts } from "../../hooks/useProduct";
import type { OnlyProduct } from "../../api/endopoints/products";
import ProductForm from "./productForm";

const ProductPage = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(); // 👈 no hay toggleStatus
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productColumns: Column<OnlyProduct>[] = [
    {
      key: "providerCode",
      header: "Código",
      render: (_value, product) => (
        <span>{product.providerCode}/{product.productCode}</span>
      ),
    },
    { key: "name", header: "Nombre" },
    { key: "price", header: "Precio" },
    {
      key: "id",
      header: "Acciones",
      render: (_value, product) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            title="Ver detalle"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            👁
          </button>
          <button
            title="Editar"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            ✏️
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title-dash">Productos</h3>
        <button onClick={() => setIsModalOpen(true)}>+ Agregar</button>
      </div>

      <Table data={products} columns={productColumns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo producto"
      >
        <ProductForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProductPage;