import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import ProfileHeader from "@/components/layout/Navbar/ProfileHeader";
import Search from "./Search";

export default function Navbar() {
  const { user } = useUserStore();

  return (
    <div className={styles.nav}>
      <Search />
      <ProfileHeader user={user} />
    </div>
  );
}
