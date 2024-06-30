import { useState, useEffect } from "react";
import styles from "./style.module.css";
import ReactStarsRating from "react-awesome-stars-rating";
import Button from "@/components/Button";
import useServicesStore from "@/store/Services/useServicesStore";

export default function Ratings() {
  const { setFilter, filters } = useServicesStore();
  const [userRating, setUserRating] = useState(filters.rating);

  useEffect(() => {
    // Update local state when the store value changes
    setUserRating(filters.rating);
  }, [filters.rating]);

  const onChangeRating = (value) => {
    setUserRating(value);
    setFilter("rating", value);
  };

  return (
    <div className={styles.ratingsContainer}>
      <div className={styles.ratingsWrapper}>
        <h1>Ratings</h1>
        <ReactStarsRating
          size={20}
          isEdit={false}
          primaryColor={"black"}
          secondaryColor={"lightgray"}
          starGap={5}
          value={userRating}
          onChange={onChangeRating}
        />
      </div>
      <div className={styles.ratingsBtns}>
        {Array.from({ length: 5 }, (_, i) => (
          <Button
            className={styles.ratingsBtn}
            key={i + 1}
            onClick={() => onChangeRating(i + 1)}
          >
            {i + 1} Star{i > 0 ? "s" : ""}
          </Button>
        ))}
      </div>
    </div>
  );
}
