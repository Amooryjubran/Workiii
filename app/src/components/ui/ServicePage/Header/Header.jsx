import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
export default function Header() {
  const { t } = useTranslation();
  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${
          import.meta.env.VITE_SERVICES_PAGE_HEROBANNER
        })`,
      }}
    >
      <div className={styles.heroBannerContent}>
        <h1>{t("services.Services")}</h1>
        <div className={styles.heroBannerNav}>
          <Link to="">{t("services.Home")}</Link>
          <div />
          <Link to="services">{t("services.Servicess")}</Link>
        </div>
      </div>
    </div>
  );
}
