import PropTypes from "prop-types";
import styles from "./style.module.css";

function ServicesModal({ categories, onSelectCategory }) {
  return (
    <div className={styles.serviceModal}>
      <ul>
        {categories?.map((category, index) => (
          <li key={index} onClick={() => onSelectCategory(category.category)}>
            {category.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

ServicesModal.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      certificateReuired: PropTypes.bool.isRequired,
    })
  ),
  onSelectCategory: PropTypes.func.isRequired,
};

export default ServicesModal;
