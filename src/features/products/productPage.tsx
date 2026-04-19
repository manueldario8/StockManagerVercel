import { Table, type Column } from '../../exports';

type Product = {
  providerCode: string;
  productCode: string;
  name: string;
  price: number;
  category: string;
};

const productColumns: Column<Product>[] = [
  {
    key: "providerCode",
    header: "Código",
    render: (_, row) => `${row.providerCode}/${row.productCode}`
  },
  { key: "name", header: "Name" },
  { key: "price", header: "Price" },
  { key: "category", header: "Category" }
];

const products: Product[] = [
  { providerCode: "01", productCode: "4091", name: "AMD Ryzen 5300g", price: 180.000, category: "Electrónica"},
  { providerCode: "02", productCode: "1022", name: "Luces x3", price: 10.300, category: "Home & Deco"},
  { providerCode: "01", productCode: "4081", name: "NVIDEA RTX7030", price: 150.200, category: "Electrónica"},
  { providerCode: "03", productCode: "2024", name: "Jeans XXL", price: 8020, category: "Ropa de hombres"}
];


const ProductPage = () => {
  return (
    <>
      <h3 className='title-dash'>Productos</h3>
      <Table data={products} columns={productColumns} />
    </>
  );
};

export default ProductPage;