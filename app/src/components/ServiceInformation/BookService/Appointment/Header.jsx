import styles from "./style.module.css";
import Image from "@/components/Image";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import LocationImg from "images/Service/location.svg";
import StarImg from "images/Service/star.svg";
import ContactImg from "images/Signup/contact.svg";
import { useTranslation } from "react-i18next";
export default function Header() {
  const { serviceInformation } = useBookServiceStore();
  const { serviceInfo, images, location, dateCreated, ratings } =
    serviceInformation;
  const { serviceTitle, serviceCategory, servicePrice } = serviceInfo;
  const { street, city, state, country } = location;
  const { t } = useTranslation();

  const formattedDate = new Date(dateCreated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(images);

  return (
    <div className={styles.header}>
      <div>
        <Image
          src={images[0]?.src}
          alt={serviceTitle}
          classNameWrapper={styles.headerImg}
        />
      </div>
      <div className={styles.headerServiceInfo}>
        <div className={styles.headerServiceInfoCategory}>
          {serviceCategory}
        </div>
        <p>{serviceTitle}</p>
        <h1>${servicePrice}</h1>
        <div className={styles.locationService}>
          <Image src={LocationImg} alt={city} />
          <span>
            {street}, {city}, {state}, {country}
          </span>
        </div>
        <div className={styles.headerRating}>
          <Image src={StarImg} alt="ratings" />
          {ratings?.length == 0 ? 0 : 15}({ratings?.length})
        </div>
      </div>
      <div className={styles.headerServiceDescreptions}>
        <div>
          <Image
            classNameWrapper={styles.imgWrapper}
            className={styles.img}
            src={ContactImg}
            alt={formattedDate}
          />
          <div>
            <span>{t("dashboard.MemberSince")}</span>
            <p>{formattedDate}</p>
          </div>
        </div>
        <div>
          <Image
            classNameWrapper={styles.imgWrapper}
            className={styles.img}
            src={LocationImg}
            alt={street || city || state}
          />
          <div>
            <span>{t("listAService.Location")}</span>
            <p>
              {street}, {city}, {state}, {country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
