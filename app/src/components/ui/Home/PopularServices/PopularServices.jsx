import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import ServiceCard from "./ServiceCard";

export default function PopularServices() {
  const { data } = useFetch(`${import.meta.env.VITE_API}/api/topServices`);
  const { t } = useTranslation();

  if (!data) {
    return null;
  }
  return (
    <div className={styles.popularServices}>
      <div className={styles.title}>
        <h1>{t("landingPage.top")}</h1>
        <h2>{t("landingPage.topProviders")}</h2>
      </div>
      <div className={styles.popularServicesWrapper}>
        {data?.data?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}
