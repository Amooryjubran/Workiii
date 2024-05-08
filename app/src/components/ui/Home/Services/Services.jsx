import { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import ServiceCard from "./ServiceCard";
import { sliderSettings } from "./sliderSettings";
import getServicesData from "./servicesData";
import styles from "./style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Services() {
  const { t } = useTranslation();
  const [middleIndex, setMiddleIndex] = useState(1);
  const services = getServicesData(t);
  const settings = sliderSettings(setMiddleIndex, services.length);

  return (
    <div className={styles.serivesWrapper}>
      <div className={styles.title}>
        <h1>{t("landingPage.services")}</h1>
        <h2>{t("landingPage.whatDoYouNeed")}</h2>
      </div>
      <Slider {...settings} className={styles.serivesCards}>
        {services.map((service, index) => (
          <ServiceCard
            service={service}
            index={index}
            middleIndex={middleIndex}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}
