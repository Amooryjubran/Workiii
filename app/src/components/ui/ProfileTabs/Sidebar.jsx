import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";
import useUserStore from "@/store/useUserStore";
import Button from "@/components/Button";

export default function Sidebar({ tabs, activeTabIndex, handleTabChange }) {
  const { t } = useTranslation();
  const { user } = useUserStore();
  if (!user) return null;
  const { name, profileImg, creationDate } = user;
  const formattedDate = new Date(creationDate).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInfo}>
        {profileImg ? (
          <Image
            src={profileImg}
            alt={name}
            className={styles.profileImg}
            classNameWrapper={styles.profileImg}
          />
        ) : (
          <div className={styles.profileInitial}>{name?.charAt(0)}</div>
        )}
        <h1>{name}</h1>
        <span>
          {t("dashboard.MemberSince")} {formattedDate}
        </span>
      </div>
      <div className={styles.sideBarBtns}>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={activeTabIndex === index ? styles.activeTab : styles.tab}
            onClick={() => handleTabChange(index)}
          >
            {tab.image && <Image src={tab.image} alt={`${tab.label} icon`} />}
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTabIndex: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};
