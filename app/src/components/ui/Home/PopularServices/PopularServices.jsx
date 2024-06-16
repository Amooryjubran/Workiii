import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";
import styles from "./style.module.css";

export default function PopularServices() {
  const [data, setData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/topServices`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
