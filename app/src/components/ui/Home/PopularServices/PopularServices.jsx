import { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import ServiceCard from "./ServiceCard";
import { sliderSettings } from "./sliderSettings";
import { useFetch } from "@/hooks/useFetch";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import styles from "./style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PopularServices() {
  const { data } = useFetch(`${import.meta.env.VITE_API}/api/topServices`);
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const [middleIndex, setMiddleIndex] = useState(0);
  const settings = sliderSettings(setMiddleIndex, data?.data?.length || 0);

  if (!data) {
    return null;
  }

  const sliderContent = (
    <Slider {...settings} className={styles.serivesCards}>
      {data.data.map((service, index) => (
        <ServiceCard
          service={service}
          index={index}
          middleIndex={middleIndex}
          key={service._id}
        />
      ))}
    </Slider>
  );

  const standardContent = (
    <div className={styles.popularServicesWrapper}>
      {data.data.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );

  return (
    <div className={styles.popularServices}>
      <div className={styles.title}>
        <h1>{t("landingPage.top")}</h1>
        <h2>{t("landingPage.topProviders")}</h2>
      </div>
      {windowWidth <= 1024 ? sliderContent : standardContent}
    </div>
  );
}
