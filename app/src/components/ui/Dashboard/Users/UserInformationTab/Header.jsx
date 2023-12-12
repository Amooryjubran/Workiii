import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import Home from "images/Dashboard/home.svg";
import useUsersStore from "@/store/Dashboard/useUsers";

export default function Header() {
  const { t } = useTranslation();
  const { resetUserTab } = useUsersStore();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerParent}>
          <h1>{t("dashboard.Users")}</h1>
          <div>
            <Image src={Home} alt="home" />
            <span
              className={styles.headerContainerTitle}
              onClick={() => resetUserTab()}
            >
              {t("navbar.home")}/
            </span>
            <span
              onClick={() => resetUserTab()}
              className={styles.headerContainerCurrentTab}
            >
              {t("dashboard.Users")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
