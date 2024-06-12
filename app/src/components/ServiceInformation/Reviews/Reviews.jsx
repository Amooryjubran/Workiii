import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactStarsRating from "react-awesome-stars-rating";
import moment from "moment";
import styles from "./style.module.css";
import Button from "@/components/Button";
import { Grid, ChevronDown, ChevronUp } from "react-feather";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "@/components/Image";
import GalleryModal from "../Gallery/GalleryModal";
import WriteReview from "./WriteReview";
import { useTranslation } from "react-i18next";
import useServicePageStore from "@/store/ServiceDetail/useServicePageStore";
import { useParams } from "react-router-dom";

function Review({ rating }) {
  const { t } = useTranslation();
  const { name, date, rate, review, images, title } = rating;
  const [showFullReview, setShowFullReview] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const formattedDate = moment(date).format("MMMM D YYYY");
  return (
    <div className={styles.review}>
      <h1>{title}</h1>
      <ReactStarsRating
        size={18}
        isEdit={false}
        primaryColor={"black"}
        secondaryColor={"lightgray"}
        starGap={5}
        value={Number(rate)}
      />
      <p>{name}</p>
      <p>{formattedDate}</p>
      <div className={styles.reviewDescreption}>
        {review.length > 150 && !showFullReview
          ? `${review.substring(0, 400)}...`
          : review}
        {review.length > 150 && (
          <Button onClick={() => setShowFullReview(!showFullReview)}>
            {!showFullReview ? (
              <div>
                <span>{t("dashboard.ShowMMore")}</span>
                <ChevronDown color="#0202ffd4" size={18} />
              </div>
            ) : (
              <div>
                <span>{t("dashboard.ShowLess")}</span>
                <ChevronUp color="#0202ffd4" size={18} />
              </div>
            )}
          </Button>
        )}
      </div>
      {images?.length > 0 && (
        <div className={styles.reviewImages}>
          {images.map((image, index) => (
            <Button key={index} onClick={() => setShowGalleryModal(true)}>
              <Image src={image} className={styles.reviewImage} />
            </Button>
          ))}
        </div>
      )}
      {showGalleryModal && (
        <GalleryModal
          images={images}
          closeModal={() => setShowGalleryModal(false)}
        />
      )}
    </div>
  );
}

Review.propTypes = {
  rating: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    date: PropTypes.string.isRequired,
    title: PropTypes.string,
    rate: PropTypes.number.isRequired,
    review: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

function Reviews() {
  const { id } = useParams();
  const { t } = useTranslation();
  const moedlRef = useRef(null);
  const [modell, setModell] = useState(false);
  useClickOutside(moedlRef, () => setModell(false));

  const { fetchServiceReviews, serviceReviews, reviewsStatus, reviewsError } =
    useServicePageStore();

  useEffect(() => {
    fetchServiceReviews(id);
  }, [id, fetchServiceReviews]);

  if (reviewsStatus === "loading") {
    return <div className={styles.loading}>....</div>;
  }

  if (reviewsError) {
    return <div>Error: {reviewsError}</div>;
  }

  if (!serviceReviews) {
    return <p>No reviews available.</p>;
  }

  const { ratings, totalReviews, averageRating, reviewsImagesCount } =
    serviceReviews.data;

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTitle}>
        <div className={styles.reviewsHeader}>
          <h1>{Number(Math.round(averageRating * 10) / 10) || 0}</h1>
          <div className={styles.reviewsHeaderCol}>
            <ReactStarsRating
              size={24}
              isEdit={false}
              primaryColor={"black"}
              secondaryColor={"lightgray"}
              starGap={5}
              value={Number(averageRating) || 0}
            />
            <p>
              {totalReviews} {t("navbar.reviews")} / {reviewsImagesCount}
              {t("listAService.Images")}
            </p>
            <div className={styles.reviewsFooter}>
              <Grid size={24} color="black" />
              <Button className={styles.reviewsImgsBtn}>
                {t("dashboard.viewAll")}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.addReviewsContainer}>
          <Button onClick={() => setModell(true)}>
            {t("dashboard.AddReview")}
          </Button>
          <span>{t("dashboard.weBelieve")}</span>
        </div>
      </div>
      <div className={styles.reviewsWrapper}>
        {ratings?.map((rating, index) => (
          <Review key={index} rating={rating} />
        ))}
      </div>
      {modell && <WriteReview moedlRef={moedlRef} setModell={setModell} />}
    </div>
  );
}

Reviews.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      date: PropTypes.string.isRequired,
      title: PropTypes.string,
      rate: PropTypes.number.isRequired,
      review: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.object),
    })
  ).isRequired,
  totalReviews: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  reviewsImagesCount: PropTypes.number.isRequired,
};

export default Reviews;
