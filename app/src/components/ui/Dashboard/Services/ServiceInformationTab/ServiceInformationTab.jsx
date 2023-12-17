import { useEffect, useState } from "react";
import styles from "./style.module.css";
import useServicesStore from "@/store/Dashboard/useServices";
import Header from "./Header";
import Button from "@/components/Button";
import ServiceInformation from "@/components/ServiceInformation";
import CheckMark from "images/Dashboard/checkmark.svg";
import X from "images/cross.svg";
import Image from "@/components/Image";
import { useTranslation } from "react-i18next";
import Modal from "./Modal";

export default function ServiceInformationTab() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const {
    fetchService,
    selectedService,
    selectedServiceId,
    approveService,
    declineService,
  } = useServicesStore();

  useEffect(() => {
    if (selectedServiceId) {
      fetchService(selectedServiceId);
    }
  }, [selectedServiceId, fetchService]);

  if (!selectedService) {
    return <div>...</div>;
  }
  const handleOpenModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    console.log(actionType);
    if (actionType === "approve") {
      approveService(selectedServiceId);
    } else if (actionType === "decline") {
      console.log("omar");
      declineService(selectedServiceId);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(selectedService);
  return (
    <div>
      <div className={styles.serviceHeader}>
        <Header />
        <div className={styles.serviceHeaderBtns}>
          {selectedService.status === "Pending" && (
            <>
              <Button
                className={`${styles.btn} ${styles.approve}`}
                onClick={() => handleOpenModal("approve")}
              >
                <Image classNameWrapper={styles.img} src={CheckMark} />
                <span>{t("dashboard.Approve")}</span>
              </Button>
              <Button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={() => handleOpenModal("decline")}
              >
                <Image classNameWrapper={styles.img} src={CheckMark} />
                <span>{t("dashboard.Cancel")}</span>
              </Button>
            </>
          )}
          {selectedService.status !== "Pending" && (
            <div
              className={`${styles.status} ${
                selectedService.status == "Approved"
                  ? styles.approved
                  : styles.declined
              }`}
            >
              <Image
                classNameWrapper={styles.img}
                src={selectedService.status == "Approved" ? CheckMark : X}
                alt={selectedService.status}
              />
              <span>{selectedService.status}</span>
            </div>
          )}
        </div>
      </div>
      <ServiceInformation selectedService={selectedService} />
      {isModalOpen && (
        <Modal
          actionType={actionType}
          onConfirm={handleConfirmAction}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
