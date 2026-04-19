import { Table, type Column } from '../../exports';

type Category = {
  name: string;
};

const categoryColumns: Column<Category>[] = [
  { key: "name", header: "Name" }
];

const categories: Category[] = Array.from({ length: 10 }, (_, i) => ({
  code: i.toString().padStart(2, "0"),
  name: `Categoría ${i}`
}));


const CategoryPage = () => {
  return (
    <>
      <h3 className='title-dash'>Categorías</h3>
      <Table data={categories} columns={categoryColumns} />
    </>
  );
};

export default CategoryPage;