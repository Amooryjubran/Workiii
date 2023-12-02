import TableComponent from "./Table";
import { useFetch } from "@/hooks/useFetch";
import { Columns } from "./Columns";
export default function Categories() {
  const { data: categories } = useFetch(
    `${import.meta.env.VITE_API}/api/getCategories`
  );
  let categoroesList = categories?.data?.categories;

  if (!categoroesList) {
    return null;
  }
  return (
    <div>
      <TableComponent columns={Columns} data={categoroesList} />
    </div>
  );
}
