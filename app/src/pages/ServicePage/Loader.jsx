import styles from "./style.module.css";
import Skeleton from "@/components/Skeleton";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useLockBodyScroll } from "@uidotdev/usehooks";

export default function Loader() {
  const windowWidth = useWindowWidth();

  useLockBodyScroll();
  if (windowWidth <= 1028) {
    return (
      <div className={styles.loaderWrapper}>
        <Skeleton width="auto" height="306px" borderRadius="0 0 10px 10px" />
        <div className={styles.loaderWrapperHeader}>
          <Skeleton width="70%" height="30px" borderRadius="10px" />
          <Skeleton width="20%" height="30px" borderRadius="30px" />
        </div>
        <div className={styles.loaderWrapperMid}>
          <Skeleton width="70%" height="20px" borderRadius="10px" />
          <Skeleton width="40%" height="15px" borderRadius="10px" />
        </div>
        <div className={styles.loaderWrapperMid}>
          <Skeleton width="70%" height="20px" borderRadius="10px" />
          <Skeleton width="100%" height="15px" borderRadius="10px" />
          <Skeleton width="80%" height="15px" borderRadius="10px" />
        </div>
        <div className={styles.loaderWrapperMid}>
          <Skeleton width="40%" height="20px" borderRadius="10px" />
          <div className={styles.loaderWrapperFooter}>
            <Skeleton width="35px" height="35px" borderRadius="50%" />
            <Skeleton width="200px" height="15px" borderRadius="10px" />
          </div>
          <div className={styles.loaderWrapperFooter}>
            <Skeleton width="35px" height="35px" borderRadius="50%" />
            <Skeleton width="150px" height="15px" borderRadius="10px" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderWrapperDesktopHeader}>
        <Skeleton width="200px" height="10px" borderRadius="10px" />
        <Skeleton width="250px" height="15px" borderRadius="10px" />
        <Skeleton width="70px" height="10px" borderRadius="10px" />
      </div>
      <div className={styles.loaderWrapperDesktopImgs}>
        <div>
          <Skeleton width="100%" height="420px" borderRadius="10px" />
        </div>
        <div>
          <Skeleton width="100%" height="205px" borderRadius="10px" />

          <Skeleton width="100%" height="205px" borderRadius="10px" />
        </div>
        <div>
          <Skeleton width="100%" height="205px" borderRadius="10px" />
          <Skeleton width="100%" height="205px" borderRadius="10px" />
        </div>
      </div>
      <div className={styles.loaderWrapperDesktopMid}>
        <div className={styles.loaderWrapperDesktopMidContainer}>
          <div className={styles.loaderWrapperDesktopHeader}>
            <Skeleton width="200px" height="10px" borderRadius="10px" />
            <Skeleton width="450px" height="15px" borderRadius="10px" />
            <Skeleton width="390px" height="10px" borderRadius="10px" />
          </div>

          <div
            className={styles.loaderWrapperDesktopHeader}
            style={{ margin: "30px 0" }}
          >
            <Skeleton width="370px" height="10px" borderRadius="10px" />
            <Skeleton width="200px" height="15px" borderRadius="10px" />
            <Skeleton width="500px" height="10px" borderRadius="10px" />
          </div>

          <div
            className={styles.loaderWrapperDesktopHeader}
            style={{ margin: "30px 0" }}
          >
            <Skeleton width="170px" height="10px" borderRadius="10px" />
            <Skeleton width="390px" height="15px" borderRadius="10px" />
            <Skeleton width="470px" height="10px" borderRadius="10px" />
          </div>
        </div>

        <div className={styles.loaderWrapperDesktopMidSidebar}>
          <Skeleton width="150px" height="10px" borderRadius="10px" />
          <div className={styles.loaderWrapperDesktopMidSidebarBottom}>
            <div>
              <Skeleton width="90px" height="15px" borderRadius="10px" />
              <Skeleton width="120px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
            <div>
              <Skeleton width="70px" height="15px" borderRadius="10px" />
              <Skeleton width="140px" height="10px" borderRadius="10px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
