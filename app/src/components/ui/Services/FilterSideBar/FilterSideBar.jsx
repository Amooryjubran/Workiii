import { useState } from "react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import FilterCategories from "./FilterCategories";
import FilterPrice from "./FilterPrice";
import Arrow from "images/chev.svg";
import Button from "@/components/Button";
import Image from "@/components/Image";

export default function FilterSideBar() {
  const { t } = useTranslation();
  const [mobileModal, setMobileModal] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 1028;

  const handleMobileDropdown = () => {
    setMobileModal(!mobileModal);
  };

  return (
    <div className={styles.filterSideBar}>
      <div className={styles.filterSideBarContainer}>
        <span className={styles.filterSideBarTitle}>
          {t("services.filterBy")}
        </span>
        {isMobileView && (
          <Button
            onClick={handleMobileDropdown}
            className={styles.filterModalBtn}
          >
            <Image
              src={Arrow}
              alt="Arrow"
              className={`${styles.arrow} ${
                mobileModal ? styles.arrowActive : ""
              }`}
            />
          </Button>
        )}
      </div>

      {(!isMobileView || mobileModal) && (
        <>
          <FilterCategories />
          <FilterPrice />
        </>
      )}
    </div>
  );
}
