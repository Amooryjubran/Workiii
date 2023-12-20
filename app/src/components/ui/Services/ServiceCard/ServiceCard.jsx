import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";
import StarImg from "images/Service/star.svg";
import LocationImg from "images/Service/location.svg";
import Arrow from "images/chev.svg";

export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  const {
    serviceInfo,
    ratings,
    location,
    userName,
    userProfileImg,
    _id,
    images,
  } = service;
  const { serviceTitle, servicePrice } = serviceInfo;
  return (
    <div className={styles.serviceCard}>
      <Image
        src={images[0]?.src}
        alt={service.serviceInfo.serviceTitle}
        classNameWrapper={styles.serviceCardImg}
      />
      <div className={styles.serviceCardHeader}>
        <div className={styles.serviceCardHeaderInfo}>
          <h1>{serviceTitle}</h1>
          <div className={styles.headerRating}>
            <Image src={StarImg} alt="ratings" />
            {ratings?.length == 0 ? 0 : ratings?.length}({ratings?.length})
          </div>
        </div>
        <div className={styles.headerInfoLocation}>
          <Image src={LocationImg} alt={location?.city} />
          {location.city}, {location.state}
        </div>
        <div className={styles.headerInfoProfile}>
          {userProfileImg ? (
            <Image src={userProfileImg} alt={userName} />
          ) : (
            <div className={styles.headerInfoImg}>{userName.charAt(0)}</div>
          )}
          <span>{userName}</span>
        </div>
      </div>
      <div className={styles.serviceCardFooter}>
        <h1>${servicePrice}</h1>
        <LinkButton to={`service/${_id}`} className={styles.serviceLink}>
          <span>{t("services.BookNow")}</span>
          <Image src={Arrow} alt={"Arrow"} />
        </LinkButton>
      </div>
    </div>
  );
}
ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string.isRequired,
      servicePrice: PropTypes.string.isRequired,
    }),
    ratings: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
    }),
    userName: PropTypes.string.isRequired,
    userProfileImg: PropTypes.string,
    _id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};
