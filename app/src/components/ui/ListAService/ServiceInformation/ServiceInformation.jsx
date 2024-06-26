import { lazy, Suspense, useState } from "react";
import styles from "./style.module.css";
import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input";
import FileUpload from "@/components/FileUpload";
import useListAServiceStore from "@/store/useListAServiceStore";
import ServicesModal from "./ServicesModal";
import PriceImg from "images/ListAService/$.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { Trash2 } from "react-feather";
// Lazy load the RichTextEditor
const RichTextEditor = lazy(() => import("@/components/RichTextEditor"));
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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_IMG_NAME);

      // Upload file to Cloudinary
      fetch(import.meta.env.VITE_IMG_CODE, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            // Update Zustand store with the URL of the uploaded file
            setServiceInfo({ serviceCertificate: data });
          } else {
            console.error("Cloudinary upload error:", data.error);
          }
        })
        .catch((error) => {
          console.error("Cloudinary upload failed:", error);
        });
    }
  };
  let categories = data?.data;
  return (
    <div className={styles.serviceInformationContainer}>
      <div className={styles.serviceInformationWrapper}>
        <div>
          <span>{t("listAServiceServicesTab.ServiceTitle")}</span>
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
          <span>{t("listAServiceServicesTab.ServiceCategory")}</span>
          <button
            onClick={() => setServicesModal(true)}
            className={`${styles.caregoriesBtn} ${
              !serviceInfo.serviceCategory ? styles.caregoriesBtnInActive : ""
            } `}
          >
            {serviceInfo.serviceCategory ||
              t("listAServiceServicesTab.SelectCategory")}
          </button>
          {servicesModal && (
            <ServicesModal
              categories={categories}
              onSelectCategory={selectCategory}
              selectedCategory={serviceInfo.serviceCategory}
            />
          )}
        </div>
      </div>
      <div className={styles.serviceCategoryContainer}>
        <span>{t("listAServiceServicesTab.ServiceDescription")}</span>
        <Suspense fallback={<div>Loading...</div>}>
          <RichTextEditor
            value={serviceInfo.serviceDescription}
            onChange={(data) => setServiceInfo({ serviceDescription: data })}
          />
        </Suspense>
      </div>
      <div className={styles.serviceCategoryContainer}>
        <span>{t("listAServiceServicesTab.ServiceCertificate")}</span>
        <div className={styles.serviceCertificate}>
          {serviceInfo?.serviceCertificate && (
            <span className={styles.titleCertificate}>
              {`${serviceInfo?.serviceCertificate?.original_filename}.${serviceInfo?.serviceCertificate?.format}`}

              <Button
                className={styles.deleteCertificate}
                onClick={() => setServiceInfo({ serviceCertificate: "" })}
              >
                <Trash2 size={16} color="#C70039 " />
              </Button>
            </span>
          )}

          <FileUpload
            onFileSelect={(event) => handleFileSelect(event.target.files[0])}
            accept=".pdf"
            buttonText={t("listAServiceServicesTab.Upload")}
          />
        </div>
      </div>
      <div className={styles.serviceInformationWrapper}>
        <div>
          <span>{t("listAServiceServicesTab.ServicePrice")}</span>
          <div className={styles.serviceCategoryPricing}>
            <Input
              type="number"
              name="servicePrice"
              value={serviceInfo.servicePrice}
              onChange={handleInputChange}
              placeholder={t("listAServiceServicesTab.EnterPrice")}
              className={styles.input}
            />
            <Image
              src={PriceImg}
              alt="$"
              classNameWrapper={styles.imgWrapper}
            />
          </div>
        </div>
        <div>
          <span>{t("listAServiceServicesTab.ServiceDuration")}</span>
          <div className={styles.serviceCategoryPricing}>
            <Input
              type="number"
              name="serviceDuration"
              value={serviceInfo.serviceDuration}
              onChange={handleInputChange}
              placeholder={t("listAServiceServicesTab.EnterDuration")}
              className={styles.input}
            />
            <span>{t("listAServiceServicesTab.Mins")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
