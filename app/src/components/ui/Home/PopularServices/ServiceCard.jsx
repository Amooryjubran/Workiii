import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import HeartImg from "images/Home/heart.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";
import LinkButton from "@/components/Link";
import { StarRating } from "./Stars";

export default function ServiceCard({
  service: { _id, providerName, averageRating, ratings, images, serviceInfo },
}) {
  const { t } = useTranslation();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <LinkButton className={styles.serviceCard} to={`service/${_id}`}>
      <div>
        <div className={styles.serviceCardImgWrapper}>
          <Image
            src={images[0]?.src}
            alt={providerName || serviceInfo.serviceTitle}
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
          <p
            dangerouslySetInnerHTML={{
              __html: truncateText(serviceInfo.serviceDescription, 100),
            }}
          />

          <div className={styles.ratingsContainer}>
            <StarRating rating={Number(averageRating)} />
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
    providerName: PropTypes.string,
    averageRating: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
      })
    ),
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string.isRequired,
      servicePrice: PropTypes.string.isRequired,
      serviceCategory: PropTypes.string.isRequired,
      serviceDescription: PropTypes.string.isRequired,
    }).isRequired,
    ratings: PropTypes.array.isRequired,
  }),
};
