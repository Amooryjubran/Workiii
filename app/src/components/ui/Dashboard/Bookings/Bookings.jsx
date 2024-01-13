import useUserStore from "@/store/useUserStore";
import Header from "./Header";
import styles from "./style.module.css";
import useBookingsStore from "@/store/Dashboard/useBookings";
import { useEffect } from "react";

export default function Bookings() {
  const { bookings, fetchBookings } = useBookingsStore();
  const { user } = useUserStore();
  useEffect(() => {
    if (user?._id && bookings.length === 0) {
      fetchBookings(user._id);
    }
  }, [bookings.length, user._id, fetchBookings]);

  console.log(bookings);
  return (
    <div className={styles.bookingWrapper}>
      <Header />
    </div>
  );
}
