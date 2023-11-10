import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import SuccessImg from "images/Signup/success.svg";
import LinkButton from "@/components/Link";

export default function Success() {
  const { t } = useTranslation();

  return (
    <div className={styles.successContainer}>
      <h1>{t("signUpSuccess.success")}</h1>
      <Image
        classNameWrapper={styles.inputImgWrapper}
        className={styles.inputImg}
        src={SuccessImg}
        alt="Success"
        height={180}
        width={180}
      />
      <div className={styles.nav}>
        <LinkButton to="my-profile" className={styles.now}>
          {t("signUpSuccess.profileSetUp")}
        </LinkButton>
        <LinkButton to="/" className={styles.later}>
          {t("signUpSuccess.profileSetUpLater")}
        </LinkButton>
      </div>
    </div>
  );
}
