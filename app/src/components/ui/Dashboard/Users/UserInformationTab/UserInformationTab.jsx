import { useEffect } from "react";
import styles from "./style.module.css";
import useUsersStore from "@/store/Dashboard/useUsers";
import PersonalHeader from "./PersonalHeader";
import Location from "./Location";

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

  return (
    <div className={styles.userInformationParent}>
      <PersonalHeader selectedUser={selectedUser} />
      <Location />
    </div>
  );
}
