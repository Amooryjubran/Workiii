import { useEffect } from "react";
import styles from "./style.module.css";
import useUsersStore from "@/store/Dashboard/useUsers";
import Header from "./Header";

import PersonalHeader from "./PersonalHeader";

export default function UserInformationTab() {
  const { fetchUser, selectedUser, selectedUserId } = useUsersStore();

  useEffect(() => {
    if (selectedUserId) {
      fetchUser(selectedUserId);
    }
  }, [selectedUserId, fetchUser]);

  if (!selectedUser) {
    return <div>...</div>;
  }
  console.log(selectedUser);

  return (
    <div className={styles.userInformationParent}>
      <Header />
      <PersonalHeader selectedUser={selectedUser} />
    </div>
  );
}
