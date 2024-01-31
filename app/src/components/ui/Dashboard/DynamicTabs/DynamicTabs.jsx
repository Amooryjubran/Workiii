import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";
import Logo from "@/assets/logo.svg";
import Arrow from "images/chev.svg";
import Button from "@/components/Button";
import Navbar from "../Navbar";
import useUsersStore from "@/store/Dashboard/useUsers";
import useServicesStore from "@/store/Dashboard/useServices";
import useBookingsStore from "@/store/Dashboard/useBookings";
import MobileNav from "../Navbar/MobileNav";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const DynamicTabs = ({ tabs }) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth >= 1028;
  const { resetUserTab } = useUsersStore();
  const { resetServiceTab } = useServicesStore();
  const { resetClientTab } = useBookingsStore();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    isMobile ? true : false
  );

  const handleTabChange = (tab, index) => {
    setActiveTabIndex(index);
    if (tab.action === "resetUserTab") {
      resetUserTab();
    }
    if (tab.action === "resetServicesTab") {
      resetServiceTab();
    }
    if (tab.action === "resetBookingsTab") {
      resetClientTab();
    }
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
          <Image
            src={Logo}
            alt="Logo"
            className={styles.logoLinkImg}
            classNameWrapper={styles.logoLinkImgWrapper}
          />
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
              onClick={() => {
                if (!isMobile) {
                  setIsSidebarVisible(false);
                }
                handleTabChange(tab, index);
              }}
            >
              {tab.image && <Image src={tab.image} alt={`${tab.label} icon`} />}
              {tab.label}
            </button>
          ))}
      </div>
      <div className={styles.tabContent}>
        {isMobile ? (
          <Navbar />
        ) : (
          <MobileNav setIsSidebarVisible={setIsSidebarVisible} />
        )}
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
