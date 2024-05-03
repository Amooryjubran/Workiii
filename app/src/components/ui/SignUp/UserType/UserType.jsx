import { useState } from "react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import useSignUpStore from "@/store/useSignUpStore";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Provider from "@/assets/images/Signup/provider.svg";
import Client from "@/assets/images/Signup/client.svg";
import UserTypeChecked from "@/assets/images/Signup/userTypeChecked.svg";

export default function UserTypeSelector() {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const [selectedType, setSelectedType] = useState(null);
  const { setUserType, goToNextStep, errors, setErrors } = useSignUpStore();

  const handleUserTypeSelection = (type) => {
    // Set the chosen type but don't proceed to the next step yet
    setUserType(type);
    setSelectedType(type);
  };

  const handleNextStep = () => {
    if (selectedType) {
      goToNextStep();
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userType: "Please select a user type before proceeding.",
      }));
    }
  };

  return (
    <div className={styles.userTypeContainer}>
      <h2>{t("userTypeSelector.prompt")}</h2>

      <div className={styles.userTypeBtns}>
        <Button
          className={`${styles.userType} ${
            selectedType === "provider" ? styles.selected : ""
          }`}
          onClick={() => handleUserTypeSelection("provider")}
        >
          <span>{t("userTypeSelector.offerService")}</span>
          <Image
            src={Provider}
            alt="Provider"
            height={windowWidth > 1028 ? 118 : 70}
            width={windowWidth > 1028 ? 118 : 70}
          />
          <h3 className={selectedType === "provider" ? styles.activeH3 : ""}>
            {t("userTypeSelector.provider")}
          </h3>
          {selectedType === "provider" && (
            <Image
              className={styles.checkedImg}
              src={UserTypeChecked}
              alt="Checked"
            />
          )}
        </Button>
        <Button
          className={`${styles.userType} ${
            selectedType === "client" ? styles.selected : ""
          }`}
          onClick={() => handleUserTypeSelection("client")}
        >
          <span>{t("userTypeSelector.needService")}</span>
          <Image
            src={Client}
            alt="Client"
            height={windowWidth > 1028 ? 118 : 70}
            width={windowWidth > 1028 ? 118 : 70}
          />
          <h3 className={selectedType === "client" ? styles.activeH3 : ""}>
            {t("userTypeSelector.client")}
          </h3>
          {selectedType === "client" && (
            <Image
              className={styles.checkedImg}
              src={UserTypeChecked}
              alt="Checked"
            />
          )}
        </Button>
      </div>

      {errors && errors.userType && (
        <p style={{ color: "red" }}>{t("userTypeSelector.selectUserType")}</p>
      )}
      <Button
        onClick={handleNextStep}
        className={`${styles.button} ${styles.authContainerBtn}`}
        disabled={!selectedType}
      >
        {t("signup.next")}
      </Button>
    </div>
  );
}
