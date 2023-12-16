import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";
import LocationImg from "images/Service/location.svg";
import ContactImg from "images/Signup/contact.svg";

export default function Providers({ name, date, location }) {
  const { t } = useTranslation();

  return (
    <div className={styles.providersWrapper}>
      <h1>{t("dashboard.ServiceProvider")}</h1>
      <div className={styles.providers}>
        <div>
          <div className={styles.imgName}>{name.charAt(0)}</div>
          <span>{name}</span>
        </div>
        <div>
          <Image
            classNameWrapper={styles.imgWrapper}
            className={styles.img}
            src={ContactImg}
            alt={name}
          />
          <span>{date}</span>
        </div>
        <div>
          <Image
            classNameWrapper={styles.imgWrapper}
            className={styles.img}
            src={LocationImg}
            alt={name}
          />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
Providers.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  location: PropTypes.string.isRequired,
};

Providers.defaultProps = {
  date: "Not specified",
};
