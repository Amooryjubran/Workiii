import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import Image from "@/components/Image";
import StarImg from "images/Service/star.svg";
import LocationImg from "images/Service/location.svg";
import ticketImg from "images/CreditCards/ticket.svg";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function BookingSummary() {
  const { t } = useTranslation();
  const {
    serviceInformation,
    selectedDate,
    selectedTimes,
    totalPrice,
    serviceFee,
  } = useBookServiceStore();
  const { serviceInfo, images, location, ratings, providerName } =
    serviceInformation;
  const { serviceTitle, servicePrice } = serviceInfo;
  const { street, city, state, country } = location;
  const formatAddress = () => {
    const addressParts = [street, city, state, country].filter(Boolean);
    return addressParts.join(", ");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  // Example usage:
  const formattedDate = formatDate(selectedDate);

  return (
    <div className={styles.paymentMethodsWrapper}>
      <h1>{t("services.booking.PaymentMethods")}</h1>
      <div className={styles.paymentMethodsContainer}>
        <div className={styles.paymentMethodsContainerHeader}>
          <Image
            src={images[0].src}
            alt={serviceTitle}
            className={styles.paymentMethodsImg}
          />
          <div className={styles.paymentMethodsContainerHeaderInfo}>
            <h1>${servicePrice}</h1>
            <p>{serviceTitle}</p>
            <div className={styles.locationService}>
              <Image src={LocationImg} alt={city} />
              <span>{formatAddress()}</span>
            </div>
            <div className={styles.headerRating}>
              <Image src={StarImg} alt="ratings" />
              {ratings?.length == 0 ? 0 : 15}({ratings?.length})
            </div>
          </div>
        </div>
        <div className={styles.paymentMethodsContainerMiddle}>
          <div>
            <span>{t("services.booking.Date")}</span>
            <span>{formattedDate}</span>
          </div>
          <div>
            <span>{t("services.booking.Time")}</span>
            <span>
              {selectedTimes[0]} - {selectedTimes.slice(-1)[0]}
            </span>
          </div>
          <div>
            <span>{t("services.booking.Provider")}</span>
            <span>{providerName}</span>
          </div>
          <div>
            <span>{t("services.booking.Subtotal")}</span>
            <span>${totalPrice}</span>
          </div>
          <div>
            <span>{t("services.booking.CouponDiscount")}</span>
            <span>$0</span>
          </div>
          <div>
            <span>{t("services.booking.GST")}</span>
            <span>$0</span>
          </div>
          <div>
            <span>{t("services.booking.ServiceFee")}</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div>
            <span>{t("services.booking.Total")}</span>
            <span>${(totalPrice + serviceFee).toFixed(2)}</span>
          </div>
        </div>
        <div className={styles.paymentMethodsContainerFooter}>
          <div>
            <Image src={ticketImg} alt={t("services.booking.EnterCoupon")} />
            <Input
              placeHolder={t("services.booking.EnterCoupon")}
              className={styles.paymentMethodsCoupon}
            />
          </div>
          <Button>{t("services.booking.Apply")}</Button>
        </div>
      </div>
    </div>
  );
}
