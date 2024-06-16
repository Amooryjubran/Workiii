import styles from "./style.module.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { Search } from "react-feather";
import FilterCategories from "../Filters/FilterCategories";
import MoreFilters from "../Filters/MoreFilters";

export default function HeroBanner({ searchQuery, setSearchQuery, onSearch }) {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${
          windowWidth >= 1028
            ? import.meta.env.VITE_SERVICES_PAGE_HEROBANNER
            : import.meta.env.VITE_SERVICES_PAGE_HEROBANNER_MOBILE
        })`,
      }}
    >
      <div className={styles.heroBannerContent}>
        <div className={styles.heroBannerNav}>
          <h1>Find Your Labourer</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.heroBannerSearch}>
          <Input
            name="text"
            placeholder={t("services.PlaceHolder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className={styles.heroBannerSearchBtn} type="submit">
            <Search color="lightgray" />
          </Button>
        </form>
        <FilterCategories />
        {windowWidth > 1028 && <MoreFilters />}
      </div>
    </div>
  );
}

HeroBanner.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
