import Image from "@/components/Image";
import styles from "./style.module.css";
import CleaningImg from "images/Home/cleaningJob.svg";
import ElectricianImg from "images/Home/electricianJob.svg";
import PaintingImg from "images/Home/paintingJob.svg";
import LinkButton from "@/components/Link";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <div className={styles.serivesWrapper}>
      <div className={styles.title}>
        <h1>{t("landingPage.services")}</h1>
        <h2>{t("landingPage.whatDoYouNeed")}</h2>
      </div>
      <div className={styles.serivesCards}>
        <div className={styles.serivesCard}>
          <Image
            src={CleaningImg}
            alt={t("landingPage.cleaning")}
            className={styles.img}
          />
          <h1>{t("landingPage.cleaningServices")}</h1>
          <p>{t("landingPage.cleaningDescription")}</p>
          <LinkButton to="services/cleaning">
            {t("landingPage.seeMore")}
          </LinkButton>
        </div>
        <div className={styles.serivesCard}>
          <Image
            src={ElectricianImg}
            alt={t("landingPage.electrician")}
            className={styles.img}
          />
          <h1>{t("landingPage.electricalServices")}</h1>
          <p>{t("landingPage.electricalDescription")}</p>
          <LinkButton to="services/electrical">
            {t("landingPage.seeMore")}
          </LinkButton>
        </div>
        <div className={styles.serivesCard}>
          <Image
            src={PaintingImg}
            alt={t("landingPage.painting")}
            className={styles.img}
          />
          <h1>{t("landingPage.paintingServices")}</h1>
          <p>{t("landingPage.paintingDescription")}</p>
          <LinkButton to="services/painting">
            {t("landingPage.seeMore")}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
