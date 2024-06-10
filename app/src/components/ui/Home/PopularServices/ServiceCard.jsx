import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import HeartImg from "images/Home/heart.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";
import LinkButton from "@/components/Link";
import ReactStarsRating from "react-awesome-stars-rating";

export default function ServiceCard({
  service: { _id, providerName, ratingsRate, ratings, images, serviceInfo },
}) {
  const { t } = useTranslation();

  return (
    <LinkButton
      className={styles.serviceCard}
      to={`service/665b31ad38622417b9215567`}
    >
      <div>
        <div className={styles.serviceCardImgWrapper}>
          <Image
            src={images[0].src}
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
            <h1>{serviceInfo.serviceTitle}</h1>
            <h1>
              ${serviceInfo.servicePrice}
              <span>/{t("landingPage.hr")}</span>
            </h1>
          </div>
          <span>{serviceInfo.serviceCategory}</span>
          <p>{serviceInfo.serviceDescription}</p>
          <div className={styles.ratingsContainer}>
            <ReactStarsRating
              size={14}
              isEdit={false}
              primaryColor={"#F9D853"}
              value={Number(ratingsRate)}
            />
            <span>({ratings.length})</span>
          </div>
        </div>
      </div>
    </LinkButton>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired,
    providerName: PropTypes.string.isRequired,
    ratingsRate: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      })
    ).isRequired,
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string.isRequired,
      servicePrice: PropTypes.string.isRequired,
      serviceCategory: PropTypes.string.isRequired,
      serviceDescription: PropTypes.string.isRequired,
    }).isRequired,
    ratings: PropTypes.array.isRequired,
  }),
};
