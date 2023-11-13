import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import HeartImg from "images/Home/heart.svg";
import Arrow from "images/chev.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";
import LinkButton from "@/components/Link";
import ReactStarsRating from "react-awesome-stars-rating";

export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  const {
    _id,
    serviceType,
    providerName,
    rate,
    ratingsCount,
    ratingsRate,
    image,
  } = service;
  return (
    <div className={styles.serviceCard}>
      <div>
        <div className={styles.serviceCardImgWrapper}>
          <Image
            src={image}
            alt={providerName}
            className={styles.cardImg}
            classNameWrapper={styles.cardImgWrapper}
          />
          <Button className={styles.wishListBtn}>
            <Image
              src={HeartImg}
              alt="wish list"
              className={styles.wishListImg}
            />
          </Button>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoHeader}>
            <h1>{providerName}</h1>
            <h1>
              ${rate}
              <span>/{t("landingPage.hr")}</span>
            </h1>
          </div>
          <span>{serviceType}</span>
          <div className={styles.ratingsContainer}>
            <ReactStarsRating
              size={20}
              isEdit={false}
              primaryColor={"#F9D853"}
              value={Number(ratingsRate)}
            />
            <span>({ratingsCount})</span>
          </div>
        </div>
      </div>

      <LinkButton className={styles.navLink} to={`service/${_id}`}>
        <span>{t("landingPage.details")}</span>
        <Image src={Arrow} alt={"Chev"} />
      </LinkButton>
    </div>
  );
}
ServiceCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
    providerName: PropTypes.string.isRequired,
    ratingsCount: PropTypes.string.isRequired,
    ratingsRate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};
