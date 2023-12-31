import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Appointment from "./Appointment";
import Payment from "./Payment";
import Done from "./Done";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Back from "@/assets/images/Signup/back.svg";
import CalenderImg from "@/assets/images/Service/calender.svg";
import WalletImg from "@/assets/images/Service/wallet.svg";
import DoneImg from "@/assets/images/Service/done.svg";
import useBookServiceStore from "@/store/Services/useBookServiceStore";

export default function BookService() {
  const { t } = useTranslation();
  const { currentStep, setCurrentStep, setModal, nextStep, previousStep } =
    useBookServiceStore();
  const stepsComponents = [Appointment, Payment, Done];

  const stepData = [
    {
      titleKey: "services.booking.Appoiment",
      subtitleKey: "services.booking.AppoimentSub",
      image: CalenderImg,
    },
    {
      titleKey: "services.booking.Payment",
      subtitleKey: "services.booking.PaymentSub",
      image: WalletImg,
    },
    {
      titleKey: "services.booking.Done",
      subtitleKey: "services.booking.DoneSub",
      image: DoneImg,
    },
  ];

  useLockBodyScroll();

  const handleConfirm = async () => {
    // Add your API call logic here
    nextStep();
  };

  const renderButtons = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Button onClick={() => setModal(false)}>
              {t("services.booking.Cancel")}
            </Button>
            <Button onClick={nextStep}>{t("services.booking.Next")}</Button>
          </>
        );
      case 1:
        return (
          <>
            <Button onClick={previousStep}>{t("services.booking.Back")}</Button>
            <Button onClick={handleConfirm}>
              {t("services.booking.Confirm")}
            </Button>
          </>
        );
      case 2:
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.bookServiceModal}>
      <div className={styles.bookServiceModalWrapper}>
        <Button
          onClick={() => setModal(false)}
          className={styles.BookServiceBackToHome}
        >
          <Image src={Back} alt="Back" />
          <span>{t("signup.backToHome")}</span>
        </Button>
        <div className={styles.bookServiceModalTabs}>
          <div className={styles.tabs}>
            {stepData.map((step, index) => (
              <button
                key={index}
                className={`${styles.tab} ${
                  index === currentStep ? styles.active : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <Image
                  src={step.image}
                  alt={t(step.titleKey)}
                  classNameWrapper={styles.img}
                />
                <div>
                  <h1>{t(step.titleKey)}</h1>
                  <span>{t(step.subtitleKey)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {React.createElement(stepsComponents[currentStep])}
        <div className={styles.navigationButtons}>{renderButtons()}</div>
      </div>
    </div>
  );
}
