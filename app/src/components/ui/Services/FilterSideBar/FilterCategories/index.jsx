import Button from "@/components/Button";
import styles from "../style.module.css";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect } from "react";
export default function FilterCategories({ handleCategoryChange }) {
  const { fetchCategories, categories } = useServicesStore();
  const { t } = useTranslation();
  useEffect(() => {
    fetchCategories();
  }, []);
  // let filteredData = data?.data[0]?.categories;
  return (
    <div className={styles.wrapper}>
      <span className={styles.filterCategoriesTitle}>
        {t("services.ServicesCategories")}
      </span>
      {categories?.map((filter) => (
        <Button
          className={styles.filterCategoriesBtns}
          key={filter._id}
          onClick={() => handleCategoryChange(filter.category)}
        >
          {filter.category}
        </Button>
      ))}

      <Button
        className={styles.filterCategoriesBtns}
        onClick={() => handleCategoryChange("")}
      >
        Reset Filters
      </Button>
    </div>
  );
}
