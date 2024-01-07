import styles from "./style.module.css";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import { useTranslation } from "react-i18next";
import PaymentMethods from "./PaymentMethods";
import BookingSummary from "./BookingSummary";
import useUserStore from "@/store/useUserStore";

export default function Payment() {
  const { serviceInformation } = useBookServiceStore();
  const { serviceInfo, images, location, dateCreated, ratings } =
    serviceInformation;
  const { serviceTitle, serviceCategory, servicePrice } = serviceInfo;
  const { street, city, state, country } = location;
  const { t } = useTranslation();
  return (
    <div className={styles.paymentWrapper}>
      <PaymentMethods />
      <BookingSummary />
    </div>
  );
}
