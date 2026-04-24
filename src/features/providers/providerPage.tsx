import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Table, type Column } from "../../exports";
import { useProviders } from "../../hooks/useProvider";
import type { OnlyProvider } from "../../api/endopoints/providers";
import { ProviderForm, Modal }from "../../exports";

const ProviderPage = () => {
  const navigate = useNavigate();
  const { providers, loading, error, toggleStatus } = useProviders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const providerColumns: Column<OnlyProvider>[] = [
    { key: "code", header: "Código" },
    { key: "name", header: "Nombre" },
    {
      key: "statusActived",
      header: "Estado",
      render: (_value, provider) => (
        <span style={{ color: provider.statusActived ? "green" : "gray" }}>
          {provider.statusActived ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "id",
      header: "Acciones",
      render: (_value, provider) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button title="Ver detalle" onClick={() => navigate(`/providers/${provider.id}`)}>
            👁
          </button>
          <button title="Editar" onClick={() => navigate(`/providers/${provider.id}`)}>
            ✏️
          </button>
          <button
            title={provider.statusActived ? "Desactivar" : "Activar"}
            onClick={() => toggleStatus(provider.id)}
          >
            {provider.statusActived ? "🔴" : "🟢"}
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Cargando proveedores...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title-dash">Proveedores</h3>
        <button onClick={() => setIsModalOpen(true)}>+ Agregar</button>
      </div>
      <Table data={providers} columns={providerColumns} />



      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo proveedor"
      >
        <ProviderForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProviderPage;