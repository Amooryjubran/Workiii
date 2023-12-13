import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import Home from "images/Dashboard/home.svg";
import useServicesStore from "@/store/Dashboard/useServices";

export default function Header() {
  const { t } = useTranslation();
  const { resetServiceTab } = useServicesStore();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerParent}>
          <h1>{t("dashboard.Services")}</h1>
          <div>
            <Image src={Home} alt="home" />
            <span
              className={styles.headerContainerTitle}
              onClick={() => resetServiceTab()}
            >
              {t("navbar.home")}/
            </span>
            <span
              onClick={() => resetServiceTab()}
              className={styles.headerContainerCurrentTab}
            >
              {t("dashboard.Services")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
