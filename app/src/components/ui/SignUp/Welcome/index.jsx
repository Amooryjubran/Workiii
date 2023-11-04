import useSignUpStore from "@/store/useSignUpStore";
import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

export default function index() {
  const { t } = useTranslation();
  const goToNextStep = useSignUpStore((state) => state.goToNextStep);

  return (
    <div className={styles.authContainerWelcome}>
      <h2>
        {t("signup.hey")} <br />
        {t("signup.welcomeToWorkiii")}
      </h2>
      <span>{t("signup.findingRightJob")}</span>
      <p>
        <input type="checkbox" required />
        {t("signup.agreeTo")}{" "}
        <LinkButton to={"/privacy"}>{t("signup.privacyPolicy")}</LinkButton>
      </p>
      <Button
        onClick={goToNextStep}
        className={`${styles.button} ${styles.authContainerBtn}`}
      >
        {t("signup.next")}
      </Button>
    </div>
  );
}
