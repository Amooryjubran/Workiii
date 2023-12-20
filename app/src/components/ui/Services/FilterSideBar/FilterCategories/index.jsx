import Button from "@/components/Button";
import styles from "../style.module.css";
import { useFetch } from "@/hooks/useFetch";
import { useTranslation } from "react-i18next";
export default function FilterCategories({ handleCategoryChange }) {
  const { data } = useFetch(
    `${import.meta.env.VITE_API}/api/servicesCategories`
  );
  const { t } = useTranslation();

  let filteredData = data?.data[0]?.categories;
  return (
    <div className={styles.wrapper}>
      <span className={styles.filterCategoriesTitle}>
        {t("services.ServicesCategories")}
      </span>
      {filteredData?.map((filter) => (
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
