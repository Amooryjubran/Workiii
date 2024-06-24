import { useState, useRef } from "react";
import styles from "./style.module.css";
import Button from "@/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { X, Check } from "react-feather";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import useServicesStore from "@/store/Services/useServicesStore";
import { filterOptions, isFilterActive } from "./filtersConfig";

export default function MoreFilters() {
  const { filters } = useServicesStore();
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
            } ${isActive ? styles.activeFilter : ""}`} // Add the active class if the filter is active
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
            <Button onClick={() => setIsMobileModalOpen(false)}> </Button>
          </div>
          {renderFilterButtons()}
        </div>
      )}
    </>
  );
}
