import PropTypes from "prop-types";
import Image from "@/components/Image";
import styles from "./style.module.css";
import Arrow from "images/chev.svg";

export default function ProfileHeader({ user }) {
  const { name, profileImg, userType } = user;
  return (
    <button className={styles.profileHeader}>
      <div>
        {profileImg ? (
          <img src={profileImg} alt={name} />
        ) : (
          <div className={styles.profileInitial}>{name?.charAt(0)}</div>
        )}
      </div>
      <div className={styles.profileHeaderWrapper}>
        <span>{name}</span>
        <p>{userType}</p>
      </div>
      <Image
        className={styles.arrow}
        src={Arrow}
        alt="Profile"
        height={20}
        width={20}
      />
    </button>
  );
}
ProfileHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
