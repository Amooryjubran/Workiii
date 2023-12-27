import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function HeroBanner({ searchQuery, setSearchQuery, onSearch }) {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <div
      className={styles.heroBanner}
      style={{
        backgroundImage: `url(${
          import.meta.env.VITE_SERVICES_PAGE_HEROBANNER
        })`,
      }}
    >
      <div className={styles.heroBannerContent}>
        <h1>{t("services.Services")}</h1>
        <div className={styles.heroBannerNav}>
          <Link to="">{t("services.Home")}</Link>
          <div />
          <Link to="services">{t("services.Servicess")}</Link>
        </div>
        <form onSubmit={handleSubmit} className={styles.heroBannerSearch}>
          <Input
            name="text"
            placeholder={t("services.PlaceHolder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className={styles.heroBannerSearchBtn} type="submit">
            {t("services.Search")}
          </Button>
        </form>
      </div>
    </div>
  );
}

HeroBanner.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
