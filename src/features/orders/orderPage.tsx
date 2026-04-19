import { Table, type Column } from '../../exports';

type Order = {
  id: string;
  user: string;
  dni: string
  date: string;
  status: string
};

const orderColumns: Column<Order>[] = [
  
  { key: "id", header: "Número de órden" },
  { key: "user", header: "Cliente" },
  { key: "dni", header: "DNI" },
  { key: "date", header: "Fecha" },
  { key: "status", header: "Estado" }
];

const orders = [
  { id: "0001", user: "Juan Pérez", dni: "30111222", date: "2026-04-10", status: "Pendiente" },
  { id: "0002", user: "María Gómez", dni: "28999888", date: "2026-04-11", status: "Completado" },
  { id: "0003", user: "Carlos López", dni: "31222333", date: "2026-04-11", status: "Cancelado" },
  { id: "0004", user: "Lucía Fernández", dni: "33444555", date: "2026-04-12", status: "Pendiente" },
  { id: "0005", user: "Diego Martínez", dni: "29888777", date: "2026-04-12", status: "En proceso" },
  { id: "0006", user: "Sofía Ramírez", dni: "35666777", date: "2026-04-13", status: "Completado" },
  { id: "0007", user: "Pedro Sánchez", dni: "26777444", date: "2026-04-14", status: "Pendiente" },
  { id: "0008", user: "Valentina Castro", dni: "34555999", date: "2026-04-14", status: "En proceso" },
  { id: "0009", user: "Fernando Díaz", dni: "27888999", date: "2026-04-15", status: "Cancelado" },
  { id: "0010", user: "Camila Torres", dni: "32222111", date: "2026-04-15", status: "Completado" }
];
const OrderPage = () => {
  return (
    <>
      <h3 className='title-dash'>Órdenes</h3>
      <Table data={orders} columns={orderColumns} />
    </>
  );
};

export default OrderPage;