import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { X, Loader } from "react-feather";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import ReactStarsRating from "react-awesome-stars-rating";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useParams } from "react-router-dom";
import useServicePageStore from "@/store/ServiceDetail/useServicePageStore";

export default function WriteReview({ moedlRef, setModell }) {
  const { t } = useTranslation();
  useLockBodyScroll();
  const { id } = useParams();
  const { fetchServiceReviews } = useServicePageStore();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const onChangeRating = (value) => {
    setUserRating(value);
  };

  const submitReview = async () => {
    if (!name || !email || !reviewTitle || !reviewText || userRating === 0) {
      setError(t("dashboard.errorReview"));
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setError("");
    setIsLoading(true);
    const reviewData = {
      name,
      email,
      userRating,
      reviewTitle,
      reviewText,
      images: images,
      serviceId: id,
    };
    try {
      await axios.post(
        `${`${import.meta.env.VITE_API}`}/api/addReview`,
        reviewData
      );
      fetchServiceReviews(id);
      setModell(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit review");
    } finally {
      setModell(false);
    }
  };

  return (
    <div className={styles.writeReview} ref={moedlRef}>
      <div className={styles.writeReviewContainer}>
        <Button
          className={styles.writeReviewClose}
          onClick={() => setModell(false)}
        >
          <X color="black" />
        </Button>
        <div className={styles.writeReviewWrapper}>
          {/* Form fields */}
          <div className={styles.writeReviewTitle}>
            <span>{t("signUpForm.Name")}</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.writeReviewTitle}>
            <span>{t("signUpForm.Email")}</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.writeReviewTitle}>
            <span>{t("profile.bookingsTab.Review")}</span>
            <div className={styles.writeReviewTitleStars}>
              <ReactStarsRating
                size={24}
                isEdit={true}
                primaryColor={"black"}
                secondaryColor={"lightgray"}
                starGap={5}
                value={userRating}
                onChange={onChangeRating}
              />
            </div>
          </div>
          <div className={styles.writeReviewTitle}>
            <span>{t("dashboard.title")}</span>
            <Input
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div className={styles.writeReviewImgs}>
            <span>{t("listAService.Images")}</span>
            <ImageUpload images={images} setImages={setImages} />
          </div>
          <div className={styles.writeReviewTitle}>
            <span>{t("profile.bookingsTab.Review")}</span>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <p
            className={`${styles.error} ${
              error ? styles.errorDisplay : styles.errorHide
            }`}
          >
            {error || " "}
          </p>
        </div>
        <Button
          className={styles.writeReviewBtn}
          onClick={submitReview}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            t("dashboard.AddReview")
          )}
        </Button>
      </div>
    </div>
  );
}

WriteReview.propTypes = {
  moedlRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  setModell: PropTypes.func.isRequired,
};
