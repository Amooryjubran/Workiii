import { useState } from "react";
import useListAServiceStore from "@/store/useListAServiceStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  BookOpen,
  MapPin,
  HelpCircle,
  Image as ImageIcon,
  ChevronLeft,
  Type,
} from "react-feather";
import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import Images from "@/components/ui/ListAService/Images";
import Booking from "@/components/ui/ListAService/Booking";
import Location from "@/components/ui/ListAService/Location";
import ServiceInformation from "@/components/ui/ListAService/ServiceInformation";
import useUserStore from "@/store/useUserStore";
import QnA from "@/components/ui/ListAService/Q&A";

export default function ListAService() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const { step, goToNextStep, setStep, reset, submitService } =
    useListAServiceStore();

  // Mapping object for tab images
  const tabImages = {
    ServiceInformation: <Type size={18} color="black" />,
    Booking: <BookOpen size={18} color="black" />,
    Location: <MapPin size={18} color="black" />,
    QnA: <HelpCircle size={18} color="black" />,
    Images: <ImageIcon size={18} color="black" />,
  };
  // Map steps to their corresponding components
  const stepComponents = [ServiceInformation, Booking, Location, QnA, Images];

  // Get the current component based on the step
  const CurrentStepComponent = stepComponents[step - 1];

  const handleTabClick = (newStep) => {
    setStep(newStep);
  };
  const handleSubmission = async () => {
    const response = await submitService(user._id);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.serviceContainer}>
      <LinkButton
        to="/"
        onClick={reset}
        className={styles.serviceContainerBackLink}
      >
        <ChevronLeft />
        <span>{t("listAService.backToHome")}</span>
      </LinkButton>

      <div className={styles.navTabs}>
        {Object.keys(tabImages).map((tab, index) => (
          <button
            key={tab}
            className={`${styles.navTab} ${
              step === index + 1 ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick(index + 1)}
            onMouseEnter={() => setActiveModal(index)}
            onMouseLeave={() => setActiveModal(null)}
          >
            {tabImages[tab]}
            <div className={styles.navTabHeader}>
              <h1>{t(`listAService.${tab.replace(" ", "")}`)}</h1>
            </div>
            {activeModal === index && (
              <div className={styles.modal}>
                <AlertCircle size={14} color="black" />
                <span>{t(`listAService.${tab}Info`)}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className={styles.contentArea}>
        {/* Render the component for the current step */}
        {CurrentStepComponent && <CurrentStepComponent />}
      </div>

      {step < 5 ? (
        <button
          className={styles.nextButton}
          onClick={() => {
            goToNextStep();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("listAService.Next")}
        </button>
      ) : (
        <button className={styles.submitButton} onClick={handleSubmission}>
          {t("listAService.Submit")}
        </button>
      )}
    </div>
  );
}
