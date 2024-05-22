import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";
import { useFetch } from "@/hooks/useFetch";
import styles from "./style.module.css";

export default function PopularServices() {
  const { data } = useFetch(`${import.meta.env.VITE_API}/api/topServices`);
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  return (
    <div className={styles.popularServices}>
      <div className={styles.title}>
        <h2>{t("landingPage.topProviders")}</h2>
      </div>
      <div className={styles.popularServicesWrapper}>
        {data.data.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
