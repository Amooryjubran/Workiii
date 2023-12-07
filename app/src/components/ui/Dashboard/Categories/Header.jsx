import styles from "./style.module.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import Home from "images/Dashboard/home.svg";
import PlustImg from "images/ListAService/plus-circle.svg";

export default function Header({ setModal }) {
  const { t } = useTranslation();

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerParent}>
          <h1>{t("dashboard.Categories")}</h1>
          <div>
            <Image src={Home} alt="home" />
            <span className={styles.headerContainerTitle}>
              {t("navbar.home")}/
            </span>
            <span className={styles.headerContainerCurrentTab}>
              {t("dashboard.Categories")}
            </span>
          </div>
        </div>
        <button
          className={styles.addNewCategoryBtn}
          onClick={() => setModal(true)}
        >
          <Image src={PlustImg} alt="Add" />
          <span>{t("dashboard.AddCategory")}</span>
        </button>
      </div>
    </div>
  );
}
Header.propTypes = {
  setModal: PropTypes.func.isRequired,
};
