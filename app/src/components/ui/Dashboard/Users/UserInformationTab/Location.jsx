import PropTypes from "prop-types";
import styles from "./style.module.css";
import UserBlock from "./UserBlock";

export default function Location({ location }) {
  if (!location) {
    return null;
  }
  const { street, city, state, country, postalCode } = location;

  const Separator = () => <div className={styles.seperator} />;

  const renderUserBlock = (title, subTitle) => {
    if (!subTitle) return null;
    return (
      <>
        <Separator />
        <UserBlock title={title} subTitle={subTitle} />
      </>
    );
  };

  return (
    <div className={styles.userInformation}>
      <div>
        {renderUserBlock("Street", street)}
        {renderUserBlock("City", city)}
        {renderUserBlock("State", state)}
        {renderUserBlock("Country", country)}
        {renderUserBlock("Postal Code", postalCode)}
      </div>
    </div>
  );
}

Location.propTypes = {
  location: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};
