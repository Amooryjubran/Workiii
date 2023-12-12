import useUsersStore from "@/store/Dashboard/useUsers";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import TableComponent from "./Table";
import { Columns } from "./Columns";
import styles from "./style.module.css";
import UserInformationTab from "./UserInformationTab";

export default function Users() {
  const { t } = useTranslation();
  const { users, fetchUsers, userTab } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, []);
  const columns = Columns(styles, t);
  return (
    <div>
      {!userTab ? (
        <TableComponent columns={columns} data={users} />
      ) : (
        <UserInformationTab />
      )}
    </div>
  );
}
