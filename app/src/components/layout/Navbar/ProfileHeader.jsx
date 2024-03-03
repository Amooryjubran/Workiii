import PropTypes from "prop-types";
import Image from "@/components/Image";
import styles from "./style.module.css";
import Arrow from "images/chev.svg";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";

export default function ProfileHeader({ user, setUserModal }) {
  const { name, profileImg, userType } = user;
  return (
    <div className={styles.profileHeader}>
      <LinkButton to="dashboard">
        <div>
          {profileImg ? (
            <img src={profileImg} alt={name} />
          ) : (
            <div className={styles.profileInitial}>{name?.charAt(0)}</div>
          )}
        </div>
      </LinkButton>
      <div className={styles.profileHeaderWrapper}>
        <span>{name}</span>
        <p>{userType}</p>
      </div>
      <Button
        onClick={() => setUserModal(true)}
        className={styles.userModalBtn}
      >
        <Image
          className={styles.arrow}
          src={Arrow}
          alt="Profile"
          height={20}
          width={20}
        />
      </Button>
    </div>
  );
}
ProfileHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    userType: PropTypes.string.isRequired,
  }).isRequired,
  setUserModal: PropTypes.func.isRequired,
};
