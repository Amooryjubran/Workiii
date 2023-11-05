import useSignUpStore from "@/store/useSignUpStore";
import styles from "./style.module.css";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
export default function SignUpForm() {
  const { t } = useTranslation();
  const { userType, goToNextStep } = useSignUpStore();

  const userTypeCapitalized =
    userType.charAt(0).toUpperCase() + userType.slice(1);

  return (
    <div className={styles.authForm}>
      <h2>
        {t("signUpForm.signUpTitle", { userType: userTypeCapitalized })} <br />
        {t("signUpForm.fillFields")}
      </h2>
      <Button
        onClick={goToNextStep}
        className={`${styles.button} ${styles.authContainerBtn}`}
      >
        {t("signup.next")}
      </Button>
    </div>
  );
}
