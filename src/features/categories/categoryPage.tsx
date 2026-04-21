import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, type Column, Modal } from "../../exports";
import { useCategories } from "../../hooks/useCategory";
import type { OnlyCategory } from "../../api/categories";
import CategoryForm from "./CategoryForm";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categories, loading, error, toggleStatus } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categoryColumns: Column<OnlyCategory>[] = [
    { key: "name", header: "Nombre" },
    {
      key: "statusActived",
      header: "Estado",
      render: (_value, category) => (
        <span style={{ color: category.statusActived ? "green" : "gray" }}>
          {category.statusActived ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "id",
      header: "Acciones",
      render: (_value, category) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button title="Ver detalle" onClick={() => navigate(`/categories/${category.id}`)}>
            👁
          </button>
          <button title="Editar" onClick={() => navigate(`/categories/${category.id}`)}>
            ✏️
          </button>
          <button
            title={category.statusActived ? "Desactivar" : "Activar"}
            onClick={() => toggleStatus(category.id)}
          >
            {category.statusActived ? "🔴" : "🟢"}
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Cargando categorías...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title-dash">Categorías</h3>
        <button onClick={() => setIsModalOpen(true)}>+ Agregar</button>
      </div>
      <Table data={categories} columns={categoryColumns} />


      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nueva categoría"
      >
        <CategoryForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default CategoryPage;