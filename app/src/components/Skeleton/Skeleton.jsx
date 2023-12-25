import PropTypes from "prop-types";
import styles from "./style.module.css";

function Skeleton({ width, height }) {
  return <div className={styles.skeleton} style={{ width, height }}></div>;
}

// Define propTypes for Skeleton component
Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Skeleton;
