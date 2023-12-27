import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Services/useServicesStore";
import styles from "../style.module.css";

export default function FilterCategories() {
  const { fetchCategories, categories, filters, handleCategoryChange } =
    useServicesStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (category) => {
    handleCategoryChange(category);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.filterCategoriesTitle}>
        {t("services.ServicesCategories")}
      </span>
      {categories?.map((filter) => (
        <label key={filter._id} className={styles.filterCategoryLabel}>
          <input
            type="checkbox"
            checked={filters.category.includes(filter.category)}
            onChange={() => toggleCategory(filter.category)}
            className={styles.filterCategoryCheckbox}
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
        Reset Filters
      </button>
    </div>
  );
}
