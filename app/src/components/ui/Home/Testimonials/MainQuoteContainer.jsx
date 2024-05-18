import PropTypes from "prop-types";
import styles from "./style.module.css";

const MainQuoteContainer = ({ quote, name, role }) => (
  <div className={styles.mainQuoteContainer}>
    <div>
      <h1 className={styles.quote}>“{quote}”</h1>
      <div>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
      </div>
    </div>
  </div>
);

MainQuoteContainer.propTypes = {
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default MainQuoteContainer;
