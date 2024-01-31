import PropTypes from "prop-types";
import styles from "./style.module.css";
import { Search, Menu } from "react-feather";
import useUserStore from "@/store/useUserStore";
import Button from "@/components/Button";
import ProfileHeader from "@/components/layout/Navbar/ProfileHeader";
export default function MobileNav({ setIsSidebarVisible }) {
  const { user } = useUserStore();

  return (
    <div className={styles.mobileNav}>
      <Button
        className={styles.mobileNavBtn}
        onClick={() => setIsSidebarVisible(true)}
      >
        <Menu />
      </Button>
      <ProfileHeader user={user} />
      <Button className={styles.mobileNavBtn}>
        <Search />
      </Button>
    </div>
  );
}

MobileNav.propTypes = {
  setIsSidebarVisible: PropTypes.func.isRequired,
};
