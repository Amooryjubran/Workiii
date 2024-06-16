import { useEffect } from "react";
import useServicesStore from "@/store/Services/useServicesStore";
import styles from "../style.module.css";
import { MapPin } from "react-feather";

export default function FilterCategories() {
  const { fetchCategories, categories, filters, handleCategoryChange } =
    useServicesStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (category) => {
    handleCategoryChange(category);
  };

  return (
    <div className={styles.wrapper}>
      {categories?.map((filter) => (
        <label
          key={filter._id}
          className={`${styles.filterCategoryLabel} ${
            filters.category.includes(filter.category)
              ? styles.checkedLabel
              : ""
          }`}
        >
          <input
            type="checkbox"
            checked={filters.category.includes(filter.category)}
            onChange={() => toggleCategory(filter.category)}
            className={styles.filterCategoryCheckbox}
          />
          <MapPin
            color={
              filters.category.includes(filter.category) ? "white" : "black"
            }
            size={14}
          />
          {filter.category}
        </label>
      ))}

      <button
        className={styles.filterCategoriesBtns}
        onClick={() => {
          handleCategoryChange("reset");
        }}
      >
        Reset
      </button>
    </div>
  );
}
