import PropTypes from "prop-types";
import styles from "./style.module.css";
import { Check } from "react-feather";

function ServicesModal({ categories, onSelectCategory, selectedCategory }) {
  return (
    <div className={styles.serviceModal}>
      <ul>
        {categories?.map((category, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(category.category)}
          >
            {category.category}
            {selectedCategory === category.category && (
              <Check size={16} className={styles.checkIcon} />
            )}
          </button>
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
  selectedCategory: PropTypes.string,
};

export default ServicesModal;
