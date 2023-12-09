import useUsersStore from "@/store/Dashboard/useUsers";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TableComponent from "./Table";
import { Columns } from "./Columns";
import styles from "./style.module.css";

export default function Users() {
  const { t } = useTranslation();
  const { users, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  const columns = Columns(styles, t);
  return (
    <div>
      <TableComponent columns={columns} data={users} />
    </div>
  );
}
