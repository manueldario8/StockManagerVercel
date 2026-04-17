import { Table, type Column } from '../../exports';

type Provider = {
  code: string;
  name: string;
};

const providerColumns: Column<Provider>[] = [
  { key: "code", header: "Code" },
  { key: "name", header: "Name" },
];

const providers: Provider[] = Array.from({ length: 10 }, (_, i) => ({
  code: i.toString().padStart(2, "0"),
  name: `Proveedor ${i}`
}));


const ProviderPage = () => {
  return (
    <>
      <h3>Proveedores</h3>
      <Table data={providers} columns={providerColumns} />
    </>
  );
};

export default ProviderPage;