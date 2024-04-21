import styles from "./style.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import Button from "@/components/Button";
import ChatImg from "images/MyProfile/chat.svg";
import CancelImg from "images/MyProfile/cancel.svg";
import RebookImg from "images/MyProfile/rebook.svg";
import ReviewImg from "images/MyProfile/review.svg";

const StatusButtonGroup = ({ status, t }) => {
  const statusButtonMapping = {
    PENDING: (
      <>
        <Button className={styles.chatBtn}>
          <Image src={ChatImg} alt={t("profile.bookingsTab.Chat")} />
          <span>{t("profile.bookingsTab.Chat")}</span>
        </Button>
        <Button className={styles.cancelBtn}>
          <Image src={CancelImg} alt={t("profile.bookingsTab.Cancel")} />
          <span>{t("profile.bookingsTab.Cancel")}</span>
        </Button>
      </>
    ),
    COMPLETE: (
      <>
        <Button className={styles.rebookBtn}>
          <Image src={RebookImg} alt={t("profile.bookingsTab.Rebook")} />
          <span>{t("profile.bookingsTab.Rebook")}</span>
        </Button>
        <Button className={styles.reviewBtn}>
          <Image src={ReviewImg} alt={t("profile.bookingsTab.Review")} />
          <span>{t("profile.bookingsTab.Review")}</span>
        </Button>
      </>
    ),
    CANCELLED: (
      <Button className={styles.rebookBtn}>
        <Image src={RebookImg} alt={t("profile.bookingsTab.Rebook")} />
        <span>{t("profile.bookingsTab.Rebook")}</span>
      </Button>
    ),
    "IN-PROGRESS": (
      <>
        <Button className={styles.chatBtn}>
          <Image src={ChatImg} alt={t("profile.bookingsTab.Chat")} />
          <span>{t("profile.bookingsTab.Chat")}</span>
        </Button>
        <Button className={styles.cancelBtn}>
          <Image src={CancelImg} alt={t("profile.bookingsTab.Cancel")} />
          <span>{t("profile.bookingsTab.Cancel")}</span>
        </Button>
      </>
    ),
  };

  return (
    <div className={styles.actionBtns}>
      {statusButtonMapping[status] || null}
    </div>
  );
};

export default function BookingCard({ data }) {
  const { t } = useTranslation();
  const { serviceInfo, status, totalPrice, location, reservationDate } = data;
  const { title, image } = serviceInfo;
  const { street, city, state, country, postalCode } = location;
  const { day, hours } = reservationDate;

  const formattedDay = format(new Date(day), "yyyy/MM/dd");
  const formattedHours = hours?.join(" - ") || "";
  const statusClassName = styles[status?.toLowerCase()] || "";
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceCardHeader}>
        {image ? (
          <Image
            src={image}
            alt={title}
            classNameWrapper={styles.serviceCardImageWrapper}
          />
        ) : (
          <div className={styles.serviceTitle}>{title.substring(0, 1)}</div>
        )}
        <div className={styles.serviceCardSubHeader}>
          <div className={styles.serviceCardSubHeaderTop}>
            <h1>{title}</h1>
            <span className={statusClassName}>{status}</span>
          </div>
          <div className={styles.serviceCardSubHeaderBottom}>
            <div>
              <h2>{t("profile.bookingsTab.Amount")}:</h2>
              <p>${totalPrice}</p>
            </div>
            <div>
              <h2>{t("profile.bookingsTab.TimeDate")}:</h2>
              <p>
                {formattedDay}, {formattedHours}
              </p>
            </div>
            <div>
              <h2>{t("profile.bookingsTab.Location")}:</h2>
              <p>{`${street} ${city} ${state} ${country} ${postalCode}`}</p>
            </div>
            <div>
              <h2>{t("profile.bookingsTab.Provider")}:</h2>
              <p>To Be found</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bookingCardActions}>
        <div className={styles.rating}></div>
        <div className={styles.actionBtns}>
          <StatusButtonGroup status={status} t={t} />
        </div>
      </div>
    </div>
  );
}

BookingCard.propTypes = {
  data: PropTypes.shape({
    serviceInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    location: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
    }).isRequired,
    reservationDate: PropTypes.shape({
      day: PropTypes.string.isRequired,
      hours: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};
StatusButtonGroup.propTypes = {
  status: PropTypes.oneOf(["PENDING", "COMPLETE", "CANCELLED", "IN-PROGRESS"])
    .isRequired,
  t: PropTypes.func.isRequired,
};
