import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styles from "./style.module.css";

export default function Details({ serviceDescription }) {
  const { t } = useTranslation();

  return (
    <div className={styles.details}>
      <h1>{t("dashboard.ServiceDetails")}</h1>
      <span>{serviceDescription}</span>
    </div>
  );
}
Details.propTypes = {
  serviceDescription: PropTypes.string,
};
