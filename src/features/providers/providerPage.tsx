import { useNavigate } from "react-router-dom";
import { Table, type Column } from "../../exports";
import { useProviders } from "../../hooks/useProvider";
import type { OnlyProvider } from "../../api/providers";

const ProviderPage = () => {
  const navigate = useNavigate();
  const { providers, loading, error, toggleStatus } = useProviders();

  // Las columnas van DENTRO del componente para tener acceso a navigate y toggleStatus
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
          <button title="Editar" onClick={() => navigate(`/providers/${provider.id}/edit`)}>
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
        <button onClick={() => navigate("/providers/new")}>+ Agregar</button>
      </div>
      <Table data={providers} columns={providerColumns} />
    </>
  );
};

export default ProviderPage;