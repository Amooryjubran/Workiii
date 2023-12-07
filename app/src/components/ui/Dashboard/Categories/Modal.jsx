import { useState } from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import Input from "@/components/Input";
import { useTranslation } from "react-i18next";

export default function Modal({
  category,
  certificate,
  setModal,
  setModalData,
}) {
  const [categoryName, setCategoryName] = useState(category || "");
  const [certificateState, setCertificateState] = useState(
    certificate || false
  );
  const { t } = useTranslation();

  return (
    <div className={styles.newCategoryModal}>
      <h1>{t("dashboard.AddCategory")}</h1>
      <div>
        <span>{t("dashboard.CategoryName")}</span>
        <Input
          name=""
          className={styles.newCategoryModalInput}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div>
        <span>{t("dashboard.Certificate")}</span>
        <div className={styles.radioGroup}>
          <label
            className={`${styles.radioLabel} ${
              certificateState ? styles.radioLabelActive : ""
            }`}
          >
            <input
              className={styles.radioInput}
              type="radio"
              name="certificate"
              checked={certificateState === true}
              onChange={() => setCertificateState(true)}
            />
            {t("dashboard.Required")}
          </label>
          <label
            className={`${styles.radioLabel} ${
              !certificateState ? styles.radioLabelActive : ""
            }`}
          >
            <input
              className={styles.radioInput}
              type="radio"
              name="certificate"
              checked={certificateState === false}
              onChange={() => setCertificateState(false)}
            />
            {t("dashboard.Non")}
          </label>
        </div>
      </div>
      <div className={styles.modalsBtns}>
        <button>{t("dashboard.Save")}</button>
        <button
          onClick={() => {
            setModal(false);
            setModalData({
              category: "",
              certificate: false,
            });
          }}
        >
          {t("dashboard.Cancel")}
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  category: PropTypes.string,
  certificate: PropTypes.bool,
  setModal: PropTypes.func.isRequired,
  setModalData: PropTypes.func,
};
