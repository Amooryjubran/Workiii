import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import Appointment from "./Appointment";
import Payment from "./Payment";
import Done from "./Done";
import Button from "@/components/Button";
import Image from "@/components/Image";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/utils/showToast";
import "react-toastify/dist/ReactToastify.css";
import Back from "@/assets/images/Signup/back.svg";
import CalenderImg from "@/assets/images/Service/calender.svg";
import WalletImg from "@/assets/images/Service/wallet.svg";
import DoneImg from "@/assets/images/Service/done.svg";
import useUserStore from "@/store/useUserStore";

export default function BookService({ serviceID }) {
  const { t } = useTranslation();
  useLockBodyScroll();
  const { user } = useUserStore();
  const {
    currentStep,
    setCurrentStep,
    selectedTimes,
    setModal,
    nextStep,
    previousStep,
    location,
    initiateBooking,
  } = useBookServiceStore();
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

  const handleConfirm = async () => {
    try {
      let id = user._id;
      await initiateBooking(id, serviceID);
      showToast("success", `${t("services.booking.bookingSuccess")}`);
      // nextStep(); // Move to the next step after successful booking
    } catch (error) {
      showToast("error", `${t("services.booking.bookingError")}`);
    }
  };

  const renderButtons = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Button onClick={() => setModal(false)}>
              {t("services.booking.Cancel")}
            </Button>
            <Button
              onClick={() => {
                if (location.length === 0 || selectedTimes.length === 0) {
                  showToast("error", `${t("services.booking.toastError")}`);
                  return;
                }
                nextStep();
              }}
            >
              {t("services.booking.Next")}
            </Button>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        theme="dark"
      />
    </div>
  );
}

BookService.propTypes = {
  serviceID: PropTypes.string,
};
