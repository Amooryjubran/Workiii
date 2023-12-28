import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import FilterCategories from "./FilterCategories";
import FilterPrice from "./FilterPrice";
export default function FilterSideBar() {
  const { t } = useTranslation();

  return (
    <div className={styles.filterSideBar}>
      <span className={styles.filterSideBarTitle}>
        {t("services.filterBy")} ?
      </span>
      <FilterCategories />
      <FilterPrice />
    </div>
  );
}
