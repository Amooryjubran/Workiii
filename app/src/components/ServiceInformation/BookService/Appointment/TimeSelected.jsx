import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useBookServiceStore from "@/store/Services/useBookServiceStore";

export default function TimeSelected() {
  const { t } = useTranslation();

  const { selectedTimes, totalPrice } = useBookServiceStore();
  if (!selectedTimes.length) {
    return null;
  }

  return (
    <div className={styles.timeSelected}>
      <div className={styles.timeSelectedHeader}>
        <h1>
          {t("services.booking.total")} <strong>${totalPrice}</strong>,
        </h1>
        <span>{t("services.booking.selectedTime")}</span>
      </div>
      <div className={styles.timeSelectedWrapper}>
        {selectedTimes.map((time, index) => (
          <span key={index}>{time}</span>
        ))}
      </div>
    </div>
  );
}
