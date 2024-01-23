import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import Home from "images/Dashboard/home.svg";
import useUsersStore from "@/store/Dashboard/useUsers";
import useBookingsStore from "@/store/Dashboard/useBookings";
import Button from "@/components/Button";
import CheckMark from "images/Dashboard/checkmark.svg";
import X from "images/cross.svg";
import useClickOutside from "@/hooks/useClickOutside";
import moment from "moment";
import useUserStore from "@/store/useUserStore";

export default function Header({ tab }) {
  const { t } = useTranslation();
  const ref = useRef();
  const [modalType, setModalType] = useState();
  const [bookingUpdated, setBookingUpdated] = useState(false);

  useClickOutside(ref, () => setModalType(false));
  const { resetUserTab } = useUsersStore();
  const { user } = useUserStore();
  const {
    selectedABooking,
    fetchAbooking,
    selectedBookingID,
    acceptBookingRequest,
    declineBookingRequest,
  } = useBookingsStore();
  useEffect(() => {
    if (selectedBookingID || bookingUpdated) {
      fetchAbooking(selectedBookingID);
      setBookingUpdated(false);
    }
  }, [fetchAbooking, selectedBookingID, bookingUpdated]);
  if (!selectedABooking) {
    return;
  }
  const { clientInformation, reservationDate, totalPrice, location } =
    selectedABooking;
  const { name } = clientInformation;
  const { street, city, state, country, postalCode } = location;
  const { day, hours } = reservationDate;

  const handleApprove = async () => {
    const userID = user._id;
    const bookingID = selectedABooking._id;
    const clientID = selectedABooking.clientID;

    const success = await acceptBookingRequest(userID, bookingID, clientID);
    if (success) {
      setModalType(false);
      setBookingUpdated(true);
    }
  };

  const handleDecline = async () => {
    const userID = user._id;
    const bookingID = selectedABooking._id;
    const clientID = selectedABooking.clientID;

    const success = await declineBookingRequest(userID, bookingID, clientID);
    if (success) {
      setModalType(false);
      setBookingUpdated(true);
    }
  };

  const renderHours = () => {
    if (hours.length > 1) {
      // eslint-disable-line react/prop-types
      return (
        <span>
          {hours[0]} - {hours[hours.length - 1]}
        </span>
      );
    } else if (hours.length === 1) {
      // eslint-disable-line react/prop-types
      return <span>{hours[0]}</span>;
    }
    return null;
  };
  const RenderOrderInformation = ({ status }) => {
    return (
      <div className={styles.clientOrder}>
        <h1>
          {status} {t("dashboard.header.Service")} ?
        </h1>
        <span>
          {t("dashboard.header.YouSure")} <strong>{status}</strong> {name}
          {t("dashboard.header.Order")}{" "}
          <strong>
            {street}, {city}, {state}, {country}, {postalCode}
          </strong>{" "}
          {t("dashboard.header.Paid")}
          <strong>${totalPrice}</strong> {t("dashboard.header.at")}
          <strong>
            {moment(day).format(" MMMM Do YYYY")}, {renderHours()}
          </strong>
        </span>
      </div>
    );
  };
  RenderOrderInformation.propTypes = {
    status: PropTypes.string.isRequired,
  };

  const actionBntns = () => {
    if (tab === "Client") {
      console.log();
      return (
        <div className={styles.heaerActionBtns}>
          {selectedABooking.status === "PENDING" && (
            <>
              <Button
                className={`${styles.btn} ${styles.approve}`}
                onClick={() => setModalType("approve")}
              >
                <Image classNameWrapper={styles.img} src={CheckMark} />
                <span>{t("dashboard.Approve")}</span>
              </Button>
              <Button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={() => setModalType("cancel")}
              >
                <Image classNameWrapper={styles.img} src={X} />
                <span>{t("dashboard.Cancel")}</span>
              </Button>
            </>
          )}
          {selectedABooking.status === "IN-PROGRESS" && <div>Cancel</div>}
          {selectedABooking.status === "DECLINED" && <div>DECLINED</div>}
        </div>
      );
    }
  };
  const renderModalContent = () => {
    const handleCancel = () => {
      setModalType(false);
    };
    if (modalType === "approve") {
      return (
        <div>
          <RenderOrderInformation status={t("dashboard.Approve")} />
          <div className={styles.actionModalsBtns}>
            <Button onClick={handleApprove}>{t("dashboard.Approve")}</Button>
            <Button onClick={handleCancel}>{t("dashboard.Cancel")}</Button>
          </div>
        </div>
      );
    }
    if (modalType === "cancel") {
      return (
        <div>
          <RenderOrderInformation status={t("dashboard.Cancel")} />
          <div className={styles.actionModalsBtns}>
            <Button onClick={handleDecline}>
              {t("dashboard.header.Reject")}
            </Button>
            <Button onClick={handleCancel}>{t("dashboard.Cancel")}</Button>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerParent}>
          <h1>{t("dashboard.Users")}</h1>
          <div>
            <Image src={Home} alt="home" />
            <span
              className={styles.headerContainerTitle}
              onClick={() => resetUserTab()}
            >
              {t("navbar.home")}/
            </span>
            <span
              onClick={() => resetUserTab()}
              className={styles.headerContainerCurrentTab}
            >
              {t("dashboard.Users")}
            </span>
          </div>
        </div>
        <div>{actionBntns()}</div>
      </div>
      {modalType && (
        <div className={styles.actionsModal} ref={ref}>
          {renderModalContent()}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  tab: PropTypes.string,
};
