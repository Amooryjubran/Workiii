import PropTypes from "prop-types";
import styles from "./style.module.css";
import Image from "@/components/Image";
import UserBlock from "./UserBlock";

export default function PersonalHeader({ selectedUser }) {
  const SEPEREACTOR = () => {
    return <div className={styles.seperator} />;
  };
  const formattedDate = new Date(selectedUser.creationDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
  return (
    <div className={styles.userInformation}>
      <h1>Personal Information</h1>
      <div>
        {selectedUser.profileImg ? (
          <Image src={selectedUser.profileImg} alt={selectedUser.name} />
        ) : (
          <div className={styles.userProfileInitial}>
            {selectedUser.name.charAt(0)}
          </div>
        )}
        <SEPEREACTOR />
        <UserBlock title={"Name"} subTitle={selectedUser.name} />
        <SEPEREACTOR />
        <UserBlock title={"Phone Number"} subTitle={selectedUser.phoneNumber} />
        <SEPEREACTOR />
        <UserBlock title={"Email"} subTitle={selectedUser.email} />
        <SEPEREACTOR />
        <UserBlock title={"Member Since"} subTitle={formattedDate} />
      </div>
    </div>
  );
}

// Define PropTypes for PersonalHeader
PersonalHeader.propTypes = {
  selectedUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    creationDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
  }).isRequired,
};
