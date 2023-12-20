import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import FilterCategories from "./FilterCategories";
export default function FilterSideBar({ handleCategoryChange }) {
  const { t } = useTranslation();

  return (
    <div className={styles.filterSideBar}>
      <span className={styles.filterSideBarTitle}>
        {t("services.filterBy")} ?
      </span>
      <FilterCategories handleCategoryChange={handleCategoryChange} />
    </div>
  );
}
