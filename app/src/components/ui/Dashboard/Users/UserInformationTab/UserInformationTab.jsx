import { useEffect } from "react";
import useUsersStore from "@/store/Dashboard/useUsers";

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
  return <div>{selectedUser.name}</div>;
}
