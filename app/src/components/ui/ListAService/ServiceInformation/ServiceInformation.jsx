import { useState } from "react";
import styles from "./style.module.css";
import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input";
import FileUpload from "@/components/FileUpload";
import useListAServiceStore from "@/store/useListAServiceStore";
import ServicesModal from "./ServicesModal";

export default function ServiceInformation() {
  const { t } = useTranslation();

  const [servicesModal, setServicesModal] = useState(false);
  const { data } = useFetch(
    `${import.meta.env.VITE_API}/api/servicesCategories`
  );
  const { serviceInfo, setServiceInfo } = useListAServiceStore();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setServiceInfo({ [name]: value });
  };
  const selectCategory = (category) => {
    setServiceInfo({ serviceCategory: category });
    setServicesModal(false);
  };
  const handleFileSelect = (file) => {
    if (file) {
      // Update Zustand store with the file
      setServiceInfo({ serviceCertificate: file });
    }
  };
  let categories = data?.data[0]?.categories;
  return (
    <div className={styles.serviceInformationContainer}>
      <div className={styles.serviceInformationWrapper}>
        <div>
          <label>{t("listAServiceServicesTab.ServiceTitle")}</label>
          <Input
            type="text"
            name="serviceTitle"
            value={serviceInfo.serviceTitle}
            onChange={handleInputChange}
            placeholder={t("listAServiceServicesTab.ServiceTitle")}
            className={styles.input}
          />
        </div>
        <div className={styles.serviceCategoryWrapper}>
          <label>{t("listAServiceServicesTab.ServiceCategory")}</label>
          <button
            onClick={() => setServicesModal(true)}
            className={styles.caregoriesBtn}
          >
            {serviceInfo.serviceCategory ||
              t("listAServiceServicesTab.SelectCategory")}
          </button>
          {servicesModal && (
            <ServicesModal
              categories={categories}
              onSelectCategory={selectCategory}
            />
          )}
        </div>
      </div>
      <div className={styles.serviceCategoryContainer}>
        <label>{t("listAServiceServicesTab.ServiceDescription")}</label>
        <Input
          type="text"
          name="serviceDescription"
          value={serviceInfo.serviceDescription}
          onChange={handleInputChange}
          placeholder={t("listAServiceServicesTab.DescribeYourService")}
          className={styles.input}
        />
      </div>
      <div className={styles.serviceCategoryContainer}>
        <label>{t("listAServiceServicesTab.ServiceCertificate")}</label>
        <div className={styles.serviceCertificate}>
          <span>{serviceInfo?.serviceCertificate?.name}</span>
          <FileUpload
            onFileSelect={(event) => handleFileSelect(event.target.files[0])}
            accept=".pdf"
            buttonText={t("listAServiceServicesTab.UploadCertificate")}
          />
        </div>
      </div>
      <div className={styles.serviceInformationWrapper}>
        <div>
          <label>{t("listAServiceServicesTab.ServicePrice")}</label>
          <Input
            type="number"
            name="servicePrice"
            value={serviceInfo.servicePrice}
            onChange={handleInputChange}
            placeholder={t("listAServiceServicesTab.EnterPrice")}
            className={styles.input}
          />
        </div>
        <div>
          <label>{t("listAServiceServicesTab.ServiceDuration")}</label>
          <Input
            type="number"
            name="serviceDuration"
            value={serviceInfo.serviceDuration}
            onChange={handleInputChange}
            placeholder={t("listAServiceServicesTab.EnterDuration")}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}
