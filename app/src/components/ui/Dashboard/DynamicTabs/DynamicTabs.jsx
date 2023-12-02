import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";
import Logo from "@/assets/logo.svg";
import Arrow from "images/chev.svg";
import Button from "@/components/Button";
import Navbar from "../Navbar";

const DynamicTabs = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className={styles.dashboardContainer}>
      <div
        className={`${styles.tabs} ${
          !isSidebarVisible ? styles.tabsHidden : ""
        }`}
      >
        <LinkButton to="/" className={styles.logoLink}>
          <Image src={Logo} alt="Logo" className={styles.logoLinkImg} />
        </LinkButton>
        <Button className={styles.sideBarHideBtn} onClick={toggleSidebar}>
          <Image src={Arrow} alt="Hide" />
        </Button>
        {isSidebarVisible &&
          tabs.map((tab, index) => (
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
      <div className={styles.tabContent}>
        <Navbar />
        {tabs[activeTabIndex].component}
      </div>
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
