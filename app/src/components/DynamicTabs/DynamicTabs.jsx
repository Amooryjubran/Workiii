import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";

const DynamicTabs = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={
              activeTabIndex === index
                ? `${styles.tab} ${styles.activeTab}`
                : styles.tab
            }
            onClick={() => handleTabChange(index)}
          >
            {tab.image && <Image src={tab.image} alt={`${tab.label} icon`} />}
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>{tabs[activeTabIndex].component}</div>
    </div>
  );
};

DynamicTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default DynamicTabs;
