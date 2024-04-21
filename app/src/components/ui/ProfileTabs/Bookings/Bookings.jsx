import { useState } from "react";
import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";
import { useFetch } from "@/hooks/useFetch";
import BookingCard from "./BookingCard";
import styles from "./style.module.css";

export default function Bookings() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API}/api/${
      user?._id
    }/getListOfBookingsPagination?page=${currentPage}`
  );
  const renderBookings = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data?.bookings?.length) {
      return <h1>{t("profile.bookingsTab.noBookings")}</h1>;
    }

    return data.bookings.map((booking) => (
      <BookingCard key={booking._id} data={booking} />
    ));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.bookingContainer}>
      <h1>{t("profile.bookingsTab.Booking")}</h1>
      {renderBookings()}
      {data?.pagination && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.pagination.totalPages}
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(data.pagination.totalPages)}
            disabled={currentPage === data.pagination.totalPages}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
