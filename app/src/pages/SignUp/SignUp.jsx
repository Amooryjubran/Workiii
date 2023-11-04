import React from "react";
import styles from "./style.module.css";
import Back from "@/assets/images/Signup/back.svg";
import Star from "@/assets/images/Signup/star.svg";
import { Link } from "react-router-dom";
import useSignUpStore from "@/store/useSignUpStore";
import Welcome from "@/components/ui/SignUp/Welcome";
import UserType from "@/components/ui/SignUp/UserType";
import SignUpForm from "@/components/ui/SignUp/SignUpForm";
import OTP from "@/components/ui/SignUp/OTP";
import Success from "@/components/ui/SignUp/Success";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
export default function SignUp() {
  const { t } = useTranslation();
  const { step, reset } = useSignUpStore();
  const stepsComponents = [Welcome, UserType, SignUpForm, OTP, Success];
  const CurrentComponent = stepsComponents[step - 1];
  return (
    <div className={styles.authContainer}>
      <Link to="/" onClick={reset} className={styles.authContainerBackLink}>
        <Image src={Back} alt="Back" />
        <span>{t("signup.backToHome")}</span>
      </Link>
      <div className={styles.authWrapper}>
        <div className={styles.stepsContainer}>
          {step !== 5 ? (
            <div className={styles.stepHeader}>
              <h3>
                {t("signup.step")} {step}/
              </h3>
              <h2>4</h2>
            </div>
          ) : null}
        </div>
        <CurrentComponent />
      </div>
      <Image
        src={Star}
        alt="star"
        className={styles.star}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
