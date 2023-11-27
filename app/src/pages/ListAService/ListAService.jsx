import useListAServiceStore from "@/store/useListAServiceStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Back from "images/Signup/back.svg";
import ServiceInformationImg from "images/ListAService/service.svg";
import BookingImg from "images/ListAService/booking.svg";
import LocationImg from "images/ListAService/location.svg";
import ImagesImg from "images/ListAService/images.svg";
import LinkButton from "@/components/Link";
import Image from "@/components/Image";
import Images from "@/components/ui/ListAService/Images";
import Booking from "@/components/ui/ListAService/Booking";
import Location from "@/components/ui/ListAService/Location";
import ServiceInformation from "@/components/ui/ListAService/ServiceInformation";
import useUserStore from "@/store/useUserStore";

export default function ListAService() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { step, goToNextStep, setStep, reset, submitService } =
    useListAServiceStore();

  // Mapping object for tab images
  const tabImages = {
    ServiceInformation: ServiceInformationImg,
    Booking: BookingImg,
    Location: LocationImg,
    Images: ImagesImg,
  };
  // Map steps to their corresponding components
  const stepComponents = [ServiceInformation, Booking, Location, Images];

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
        <Image src={Back} alt="Back" />
        <span>{t("listAService.backToHome")}</span>
      </LinkButton>

      <div className={styles.navTabs}>
        {["Service Information", "Booking", "Location", "Images"].map(
          (tab, index) => (
            <button
              key={tab}
              className={`${styles.navTab} ${
                step === index + 1 ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick(index + 1)}
            >
              <Image
                src={tabImages[tab.replace(" ", "")]}
                alt={tab}
                className={styles.navImg}
                width={50}
                height={50}
              />
              <div className={styles.navTabHeader}>
                <span> {t(`listAService.${tab.replace(" ", "")}`)}</span>
                <p> {t(`listAService.${tab.replace(" ", "")}Service`)}</p>
              </div>
            </button>
          )
        )}
      </div>

      <div className={styles.contentArea}>
        {/* Render the component for the current step */}
        {CurrentStepComponent && <CurrentStepComponent />}
      </div>

      {step < 4 ? (
        <button className={styles.nextButton} onClick={goToNextStep}>
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
