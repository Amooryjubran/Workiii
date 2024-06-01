import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { getDefaultMapCenter } from "@/helpers/locationHelper";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import GoogleMapReact from "google-map-react";
import StarImg from "images/Service/star.svg";
import Image from "@/components/Image";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const Marker = () => <div className={styles.marker} />;

export default function Sidebar({
  ratings,
  booking,
  location,
  price,
  pageType,
  setModal,
  selectedService,
}) {
  const { t } = useTranslation();
  const bookButtonRef = useRef(null);
  const windowSize = useWindowWidth();
  const defaultMapCenter = getDefaultMapCenter();
  const [mapCenter, setMapCenter] = useState(location?.latLng);
  const [isFixed, setIsFixed] = useState(false);
  const { setServiceInformation } = useBookServiceStore();
  const transformBookingData = (bookingData) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "All Days",
    ];
    return daysOfWeek.map((day) => {
      const isOpen =
        bookingData[day] && bookingData[day][0].from && bookingData[day][0].to;
      const time = isOpen
        ? `${bookingData[day][0].from} - ${bookingData[day][0].to}`
        : t("dashboard.Closed");

      return { day, time, isOpen };
    });
  };
  useEffect(() => {
    if (location.latLng) {
      setMapCenter(location.latLng);
    }
  }, [location.latLng]);

  useEffect(() => {
    const handleScroll = () => {
      if (windowSize >= 1028) return;
      if (!bookButtonRef.current) return;
      const buttonRect = bookButtonRef.current.getBoundingClientRect();
      const offset = 190;
      const shouldBeFixed = window.scrollY > buttonRect.top + offset;
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowSize]);

  const handleBookNow = () => {
    setServiceInformation(selectedService);
    setModal(true);
  };

  const availableBookings = transformBookingData(booking);
  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarHeader}>
        <h1>${price}</h1>
        <div>
          <Image src={StarImg} alt="ratings" />
          {ratings?.length == 0 ? 0 : 15}({ratings?.length})
        </div>
      </div>
      <div className={styles.sideBarBooking}>
        <h1>{t("dashboard.ServiceAvailabilty")}</h1>
        <div>
          {availableBookings?.map((book, index) => (
            <div key={index} className={styles.day}>
              <h1>{book.day}</h1>
              <span
                className={book.isOpen ? styles.openTime : styles.closedTime}
              >
                {book.time}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sideBarLocation}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
          defaultCenter={defaultMapCenter}
          center={mapCenter}
          defaultZoom={10}
        >
          <Marker lat={mapCenter.lat} lng={mapCenter.lng} />
        </GoogleMapReact>
      </div>
      {pageType === "SERVICE" && (
        <button
          ref={bookButtonRef}
          className={`${styles.sideBarBookBtn} ${
            !isFixed ? styles.fixedButton : ""
          }`}
          onClick={handleBookNow}
        >
          {t("services.BookNow")}
        </button>
      )}
    </div>
  );
}
Sidebar.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    street: PropTypes.string,
    state: PropTypes.string,
    latLng: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }),
  booking: PropTypes.object,
  ratings: PropTypes.array,
  price: PropTypes.string,
  pageType: PropTypes.string,
  setModal: PropTypes.func,
  selectedService: PropTypes.object,
};
