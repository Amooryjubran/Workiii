import { useState, useRef } from "react";
import styles from "./style.module.css";
import Button from "@/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { X, Check } from "react-feather";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import useServicesStore from "@/store/Services/useServicesStore";
import { filterOptions } from "./filtersConfig";
import { useTranslation } from "react-i18next";

// Function to check if a specific filter is active
function isFilterActive(filters, label) {
  switch (label) {
    case "Rating":
      return filters.rating > 0;
    case "Pricing":
      // Active if the price range is adjusted or a specific sort order is set for pricing
      return (
        filters.priceMin !== 0 ||
        filters.priceMax !== 1000 ||
        ["highest", "lowest"].includes(filters.sortOrder)
      );
    case "Category":
      return filters.category.length > 0;
    case "Location":
      return filters.locations.length > 0;
    default:
      return false;
  }
}

export default function MoreFilters() {
  const { t } = useTranslation();
  const { filters, anyFilterActive: checkAddedFilters } = useServicesStore();
  const windowWidth = useWindowWidth();
  const modalContentRef = useRef();
  const mobileModalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useClickOutside(modalContentRef, () => setModalContent(null));
  useClickOutside(
    mobileModalRef,
    () => isMobileModalOpen && setIsMobileModalOpen(false)
  );

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const renderFilterButtons = () => (
    <>
      {filterOptions.map((option, index) => {
        const isActive = isFilterActive(filters, option.label);

        return (
          <Button
            key={index}
            onClick={() => openModal(option.content)}
            className={`${styles.filterBtn} ${
              index === filterOptions.length - 1 ? styles.lastBtn : ""
            } ${isActive ? styles.activeFilter : ""}`}
            aria-expanded={modalContent === option.content}
          >
            {option.icon}
            <div>
              <span>{option.label}</span>
              <p>{option.title}</p>
            </div>
            {isActive && (
              <Check size={12} color="green" className={styles.checkmark} />
            )}
          </Button>
        );
      })}
      {modalContent && (
        <div className={styles.modal} ref={modalContentRef}>
          <div className={styles.modalContent}>
            {modalContent}
            <Button className={styles.closeBtn} onClick={closeModal}>
              <X size={14} color="grey" />
            </Button>
          </div>
        </div>
      )}
    </>
  );

  const anyFilterActive = filterOptions.some((option) =>
    isFilterActive(filters, option.label)
  );

  return (
    <>
      <div className={styles.moreFilters}>
        {windowWidth >= 1028 ? (
          renderFilterButtons()
        ) : (
          <Button
            className={`${styles.filterBtn} ${styles.moreFiltersBtn}`}
            onClick={() => setIsMobileModalOpen(!isMobileModalOpen)}
            aria-expanded={isMobileModalOpen}
          >
            More Filters
            {anyFilterActive && (
              <Check size={12} color="green" className={styles.checkmark} />
            )}
          </Button>
        )}
      </div>
      {windowWidth < 1028 && isMobileModalOpen && (
        <div ref={mobileModalRef} className={styles.mobileFilters}>
          <div className={styles.modalCloseBtn}>
            <Button onClick={() => setIsMobileModalOpen(false)} />
          </div>
          {renderFilterButtons()}
          {checkAddedFilters() && (
            <Button
              className={styles.showResultsBtn}
              onClick={() => {
                setIsMobileModalOpen(false);
                closeModal();
              }}
            >
              {t("services.ShowResults")}
            </Button>
          )}
        </div>
      )}
    </>
  );
}
