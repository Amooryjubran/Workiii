import { useState } from "react";
import useSignUpStore from "@/store/useSignUpStore";
import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation();
  const goToNextStep = useSignUpStore((state) => state.goToNextStep);
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle the checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={styles.authContainerWelcome}>
      <h2>
        {t("signup.hey")} <br />
        {t("signup.welcomeToWorkiii")}
      </h2>
      <span>{t("signup.findingRightJob")}</span>
      <p>
        <input
          type="checkbox"
          required
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
        {t("signup.agreeTo")}{" "}
        <LinkButton to={"/privacy"}>{t("signup.privacyPolicy")}</LinkButton>
      </p>
      <Button
        onClick={goToNextStep}
        className={`${styles.button} ${styles.authContainerBtn}`}
        disabled={!isChecked}
      >
        {t("signup.next")}
      </Button>
    </div>
  );
}
