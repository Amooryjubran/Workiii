import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../style.module.css";
import useServicesStore from "@/store/Services/useServicesStore";
import { MapPin } from "react-feather";
import Input from "@/components/Input";

export default function FilterCategories() {
  const { t } = useTranslation();

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
          <Input
            type="checkbox"
            name={filter.category}
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

      {(!!filters.category.length || !!filters.locations.length) && (
        <button
          className={styles.filterCategoriesBtns}
          onClick={() => {
            handleCategoryChange("reset");
          }}
        >
          {t("notFound.reset")}
        </button>
      )}
    </div>
  );
}
