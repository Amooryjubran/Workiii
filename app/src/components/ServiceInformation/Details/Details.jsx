import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styles from "./style.module.css";
// eslint-disable-next-line no-unused-vars
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function Details({ serviceDescription }) {
  const { t } = useTranslation();

  return (
    <div className={styles.details}>
      <h1>{t("dashboard.ServiceDetails")}</h1>
      <div
        className={`${styles.previewContainer} ck-content`}
        dangerouslySetInnerHTML={{ __html: serviceDescription }}
      />
    </div>
  );
}
Details.propTypes = {
  serviceDescription: PropTypes.string,
};
