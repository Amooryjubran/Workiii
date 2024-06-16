import { useState, useRef } from "react";
import styles from "./style.module.css";
import Button from "@/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { Map, Star, DollarSign, Search, X } from "react-feather";
import Locations from "./Locations";

const filterOptions = [
  {
    label: "Location",
    title: "Add Location",
    icon: <Map size={14} color="black" />,
    content: <Locations />,
  },
  {
    label: "Pricing",
    title: "Add Location",
    icon: <Star size={14} color="black" />,
    content: <div>Soon...</div>,
  },
  {
    label: "Rating",
    title: "Add Location",
    icon: <DollarSign size={14} color="black" />,
    content: <div>Soon...</div>,
  },
  {
    label: "Search",
    title: "Add Location",
    icon: <Search size={14} color="black" />,
    content: <div>Soon...</div>,
  },
];

export default function MoreFilters() {
  const modelRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  useClickOutside(modelRef, () => setModalContent(false));

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className={styles.moreFilters}>
      {filterOptions.map((option, index) => (
        <Button
          key={index}
          onClick={() => openModal(option.content)}
          className={`${styles.filterBtn} ${
            index === filterOptions.length - 1 ? styles.lastBtn : ""
          }`}
        >
          {option.icon}
          <div>
            <span>{option.label}</span>
            <p>{option.title}</p>
          </div>
        </Button>
      ))}

      {modalContent && (
        <div className={styles.modal} ref={modelRef}>
          <div className={styles.modalContent}>
            {modalContent}
            <Button className={styles.closeBtn} onClick={closeModal}>
              <X size={14} color="grey" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
