import { useEffect, useState, useCallback } from "react";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import LinkButton from "@/components/Link";
import Image from "@/components/Image";

const professions = [
  { key: "landingPage.Plumber" },
  { key: "landingPage.Electrician" },
];

export default function HeroBanner() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const windowWidth = useWindowWidth();
  const [professionKey, setProfession] = useState(professions[0].key);
  const [animate, setAnimate] = useState(false);

  const updateProfession = useCallback(() => {
    setAnimate(true); // Trigger exit animation
    setTimeout(() => {
      const nextProfessionIndex =
        (professions.findIndex((p) => p.key === professionKey) + 1) %
        professions.length;
      setProfession(professions[nextProfessionIndex].key);
      setAnimate(false);
    }, 1000);
  }, [professionKey]);

  useEffect(() => {
    const interval = setInterval(updateProfession, 4000);
    return () => clearInterval(interval);
  }, [updateProfession]);

  let link = "sign-up";
  let buttonText = t("landingPage.offerService");

  switch (user?.userType) {
    case "provider":
      link = "list-a-service";
      buttonText = t("userTypeSelector.offerService");
      break;
    case "client":
      link = "services";
      buttonText = t("home.browseCollection");
      break;
  }
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
              {t("landingPage.allLaborers")}
              <br />
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
          <LinkButton className={styles.heroBannerSignUpLink} to={link}>
            {buttonText}
          </LinkButton>
        </div>
      </div>
      <div className={styles.backgroundContainer}>
        <Image
          className={styles.img}
          classNameWrapper={styles.imgWrapper}
          alt={professionKey}
          src={
            "https://plus.unsplash.com/premium_photo-1663013675008-bd5a7898ac4f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          height={windowWidth > 1028 ? 300 : 400}
          width={windowWidth > 1028 ? 300 : "100%"}
        />
        <Image
          className={styles.img}
          classNameWrapper={styles.imgWrapper}
          alt={professionKey}
          src={
            "https://images.pexels.com/photos/5767926/pexels-photo-5767926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          height={windowWidth > 1028 ? 300 : 400}
          width={windowWidth > 1028 ? 300 : "100%"}
        />
      </div>
    </div>
  );
}
