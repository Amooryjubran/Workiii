import { useEffect } from "react";
import styles from "./style.module.css";
import PersonalHeader from "../Users/UserInformationTab/PersonalHeader";
import Header from "../Users/UserInformationTab/Header";
import useBookingsStore from "@/store/Dashboard/useBookings";
import Location from "../Users/UserInformationTab/Location";

export default function ClientInformationTab() {
  const { fetchUser, selectedClient, selectedClientID, selectedBooking } =
    useBookingsStore();
  const { location } = selectedBooking;
  useEffect(() => {
    if (selectedClientID) {
      fetchUser(selectedClientID);
    }
  }, [selectedClientID, fetchUser]);

  if (!selectedClient) {
    return <div>...</div>;
  }

  return (
    <div className={styles.userInformationParent}>
      <Header />
      <PersonalHeader selectedUser={selectedClient} />
      <Location location={location} />
    </div>
  );
}
