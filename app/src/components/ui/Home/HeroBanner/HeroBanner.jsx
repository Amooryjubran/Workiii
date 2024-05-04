import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import LinkButton from "@/components/Link";
import Image from "@/components/Image";
import Plumber from "images/Home/Plumber.svg";
import Electrician from "images/Home/Electrician.png";

export default function HeroBanner() {
  const { t } = useTranslation();
  const [professionKey, setProfession] = useState("landingPage.Plumber");
  const [imageSrc, setImageSrc] = useState(Plumber);
  const [animate, setAnimate] = useState(false);

  // Effect to change the profession and image every second
  useEffect(() => {
    const professions = [
      { key: "landingPage.Plumber", image: Plumber },
      { key: "landingPage.Electrician", image: Electrician },
    ];
    let currentProfession = 0;

    const interval = setInterval(() => {
      setAnimate(true); // Trigger exit animation
      setTimeout(() => {
        currentProfession = (currentProfession + 1) % professions.length;
        setProfession(professions[currentProfession].key);
        setImageSrc(professions[currentProfession].image);
        setAnimate(false); // Reset for entry animation
      }, 500); // Halfway through the interval
    }, 3000); // Interval includes time for exit and entry animation

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroBannerWrapper}>
        <div className={styles.heroBannerTitle}>
          <span>{t("landingPage.welcome")}</span>
          <p>{t("landingPage.webPlatform")}</p>
        </div>
        <div className={styles.heroBannerHeader}>
          <div className={styles.heroBannerHeaderTitle}>
            <h1>
              {t("landingPage.allLaborers")} <br />
              <strong className={animate ? styles.slideOut : styles.slideIn}>
                {t(professionKey)}
              </strong>
            </h1>
          </div>
          <div className={styles.heroBannerDescreption}>
            <p>{t("landingPage.allLaborersDescreption")}</p>
          </div>
        </div>
        <div className={styles.heroBannerNavigations}>
          <LinkButton className={styles.heroBannerServicesLink} to="services">
            {t("landingPage.wantService")}
          </LinkButton>
          <LinkButton
            className={styles.heroBannerSignUpLink}
            to="list-a-service
          "
          >
            {t("landingPage.offerService")}
          </LinkButton>
        </div>
      </div>
      <div className={styles.backgroundContainer}>
        <div className={` ${animate ? styles.slideOut : styles.slideIn}`}>
          <Image src={imageSrc} className={styles.img} alt={professionKey} />
        </div>
      </div>
    </div>
  );
}
