import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./style.module.css";
const ProfileTabs = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Convert tab label to a URL-friendly format
  const toUrlFriendly = (label) => label?.replace(/\s+/g, "-");

  // Convert a URL-friendly format back to the original tab label
  const fromUrlFriendly = (urlLabel) => urlLabel?.replace(/-/g, " ");

  // Function to get the tab index from URL parameter
  const getTabIndexFromUrl = () => {
    const queryParams = new URLSearchParams(location.search);

    const tabParam = queryParams.get("tab");
    const tabIndex = tabs.findIndex(
      (tab) => tab.label === fromUrlFriendly(tabParam)
    );
    return tabIndex >= 0 ? tabIndex : 0;
  };

  // Update the active tab based on URL parameter
  useEffect(() => {
    const tabIndex = getTabIndexFromUrl();
    setActiveTabIndex(tabIndex);
  }, [location]);

  // Handle tab change
  const handleTabChange = (index) => {
    const tabLabel = toUrlFriendly(tabs[index].label);
    navigate(`${location.pathname}?tab=${tabLabel}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Sidebar
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          handleTabChange={handleTabChange}
        />
      </div>
      <div className={styles.tabsContent}>{tabs[activeTabIndex].component}</div>
    </div>
  );
};

ProfileTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default ProfileTabs;
