import useUserStore from "@/store/useUserStore";
import Header from "./Header";
import TableComponent from "./Table";
import styles from "./style.module.css";
import useBookingsStore from "@/store/Dashboard/useBookings";
import { useEffect } from "react";
import { Columns } from "./Columns";
import { useTranslation } from "react-i18next";

export default function Bookings() {
  const { t } = useTranslation();
  const { bookings, fetchBookings } = useBookingsStore();
  const { user } = useUserStore();
  useEffect(() => {
    if (user?._id && bookings.length === 0) {
      fetchBookings(user._id);
    }
  }, [bookings.length, user._id, fetchBookings]);
  if (bookings.length === 0) {
    return;
  }
  const columns = Columns(styles, t);
  let data = bookings.bookings;
  console.log(data);
  return (
    <div className={styles.bookingWrapper}>
      <Header />
      <TableComponent columns={columns} data={data} />
    </div>
  );
}
