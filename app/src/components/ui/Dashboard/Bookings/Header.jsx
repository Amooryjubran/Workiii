import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Home from "images/Dashboard/home.svg";
import SearchImg from "images/Dashboard/search.svg";
import FilterImg from "images/Dashboard/filter.svg";
import Arrow from "images/chev.svg";
import useBookingsStore from "@/store/Dashboard/useBookings";

export default function Header() {
  const { t } = useTranslation();
  const { searchValue, setSearchValue, order, setOrder } = useBookingsStore();
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setShowOrderDropdown(false);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerWrappers}>
        <h1 className={styles.headerWrapperTitle}>{t("dashboard.Bookings")}</h1>
        <div className={styles.breadCrumbs}>
          <Image src={Home} alt="home" />
          <span className={styles.headerContainerTitle}>
            {t("navbar.home")} /
          </span>
          <span className={styles.headerContainerCurrentTab}>
            {t("dashboard.Bookings")}
          </span>
        </div>
      </div>
      <div className={styles.headerParent}>
        <div className={styles.searchInput}>
          <Image src={SearchImg} alt="Search" />
          <Input
            className={styles.searchContainer}
            placeholder="Search here"
            value={searchValue}
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className={styles.headerParentBtns}>
          <div>
            <Button
              className={styles.headerParentBtn}
              onClick={() => setShowOrderDropdown(!showOrderDropdown)}
            >
              <span>Order by: {order}</span>
              <Image
                src={Arrow}
                alt="Arrow"
                classNameWrapper={styles.headerParentBtnArrow}
              />
            </Button>
            {showOrderDropdown && (
              <ul>
                <li onClick={() => handleOrderChange("Newest")}>Newest</li>
                <li onClick={() => handleOrderChange("Oldest")}>Oldest</li>
                {/* Add more sorting options here if needed */}
              </ul>
            )}
          </div>
          <div>
            <Button
              className={styles.headerParentBtn}
              onClick={() => setShowOrderDropdown(!showOrderDropdown)}
            >
              <Image src={FilterImg} alt="Arrow" />
              <span>Filter by: !</span>
            </Button>
          </div>
          {/* Other buttons or content */}
        </div>
      </div>
    </div>
  );
}
