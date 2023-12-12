import PropTypes from "prop-types";
import styles from "./style.module.css";

export default function UserBlock({ title, subTitle }) {
  return (
    <div className={styles.userBlock}>
      <p>{title}</p>
      <span>{subTitle}</span>
    </div>
  );
}
// Define PropTypes for UserBlock
UserBlock.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
