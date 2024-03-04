import styles from "./style.module.css";
import BannerImage from "images/Home/banner.png";
import LinkButton from "@/components/Link";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className={styles.overlay}>
        <h1>{t("home.bannerBrowse")}</h1>
        <LinkButton to="services" className={styles.link}>
          {t("home.browseCollection")}
        </LinkButton>
      </div>
    </div>
  );
}
