import PropTypes from "prop-types";
import Arrow from "images/ListAService/arrow.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";
import styles from "./style.module.css";

export function SampleNextArrow({ onClick }) {
  return (
    <Button className={styles.sliderNextBtn} onClick={onClick}>
      <Image
        src={Arrow}
        classNameWrapper={styles.sliderNextBtnWrapper}
        className={styles.sliderNextBtnImg}
      />
    </Button>
  );
}

export function SamplePrevArrow({ onClick }) {
  return (
    <Button className={styles.sliderPrevBtn} onClick={onClick}>
      <Image
        src={Arrow}
        classNameWrapper={styles.sliderNextBtnWrapper}
        className={styles.sliderNextBtnImg}
      />
    </Button>
  );
}

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
};
