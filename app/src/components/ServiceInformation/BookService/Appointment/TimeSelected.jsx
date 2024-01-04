import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useBookServiceStore from "@/store/Services/useBookServiceStore";

export default function TimeSelected() {
  const { t } = useTranslation();

  const { selectedTimes } = useBookServiceStore();
  if (!selectedTimes.length) {
    return null;
  }

  return (
    <div className={styles.timeSelected}>
      <span>{t("services.booking.selectedTime")}</span>
      <div>
        {selectedTimes.map((time, index) => (
          <span key={index}>{time}</span>
        ))}
      </div>
    </div>
  );
}
