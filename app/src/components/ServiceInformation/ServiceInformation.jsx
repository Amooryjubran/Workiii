import PropTypes from "prop-types";
import Header from "./Header";
import styles from "./style.module.css";

export default function ServiceInformation({ selectedService }) {
  const { location, images, booking, serviceInfo, ratings } = selectedService;
  const { serviceTitle, serviceCategory } = serviceInfo;

  return (
    <div className={styles.serviceInformation}>
      <Header
        location={location}
        serviceTitle={serviceTitle}
        serviceCategory={serviceCategory}
        ratings={ratings}
      />
    </div>
  );
}

ServiceInformation.propTypes = {
  selectedService: PropTypes.shape({
    location: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      state: PropTypes.string,
    }),
    images: PropTypes.array,
    booking: PropTypes.object,
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string,
      serviceCategory: PropTypes.string,
    }),
    ratings: PropTypes.array,
  }).isRequired,
};
