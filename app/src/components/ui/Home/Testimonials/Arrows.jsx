import PropTypes from "prop-types";
import { ArrowDownLeft, ArrowDownRight } from "react-feather";
import styles from "./style.module.css";

export const SampleNextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} ${styles.customArrow} ${styles.nextArrow}`}
    style={{ ...style }}
    onClick={onClick}
  >
    <ArrowDownRight color="black" />
  </div>
);

SampleNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export const SamplePrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} ${styles.customArrow} ${styles.prevArrow}`}
    style={{ ...style }}
    onClick={onClick}
  >
    <ArrowDownLeft color="black" />
  </div>
);

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
