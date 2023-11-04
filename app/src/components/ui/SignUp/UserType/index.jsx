import { useState } from "react";
import useSignUpStore from "@/store/useSignUpStore";
import styles from "./style.module.css";
import Button from "@/components/Button";
import Provider from "@/assets/images/Signup/provider.svg";
import Client from "@/assets/images/Signup/client.svg";
import UserTypeChecked from "@/assets/images/Signup/userTypeChecked.svg";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";

export default function UserTypeSelector() {
  const { t } = useTranslation();
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
      <h2>
        Hey 👋🏻 <br /> What Do you need ?
      </h2>
      <div className={styles.userTypeBtns}>
        <Button
          className={`${styles.userType} ${
            selectedType === "provider" ? styles.selected : ""
          }`}
          onClick={() => handleUserTypeSelection("provider")}
        >
          <span>I want to offer a service</span>
          <Image src={Provider} alt="Provider" />
          <h3>Provider</h3>
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
          <span>I want a service</span>
          <Image src={Client} alt="Client" />
          <h3>User</h3>
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
        <p style={{ color: "red" }}>{errors.userType}</p>
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
