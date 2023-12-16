import PropTypes from "prop-types";
import Header from "./Header";
import styles from "./style.module.css";
import Gallery from "./Gallery";
import Details from "./Details";
import Providers from "./Providers";

export default function ServiceInformation({ selectedService }) {
  const {
    location,
    images,
    booking,
    serviceInfo,
    ratings,
    providerName,
    dateCreated,
  } = selectedService;
  const { serviceTitle, serviceCategory, serviceDescription } = serviceInfo;
  let addressComponents = [
    location?.street,
    location?.city,
    location?.state,
    location?.country,
  ];
  // Filter out undefined or empty components and join with a comma
  let address = addressComponents.filter(Boolean).join(", ");
  let date = new Date(dateCreated);
  let memberSince = date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className={styles.serviceInformation}>
      <Header
        location={location}
        serviceTitle={serviceTitle}
        serviceCategory={serviceCategory}
        ratings={ratings}
      />
      <Gallery images={images} />
      <div className={styles.serviceBottom}>
        <div className={styles.serviceBottomWrapper}>
          <Details serviceDescription={serviceDescription} />
          <Providers
            name={providerName}
            date={memberSince}
            location={address}
          />
        </div>
      </div>
    </div>
  );
}

ServiceInformation.propTypes = {
  selectedService: PropTypes.shape({
    location: PropTypes.shape({
      city: PropTypes.string,
      street: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }),
    images: PropTypes.array,
    booking: PropTypes.object,
    serviceInfo: PropTypes.shape({
      serviceTitle: PropTypes.string,
      serviceCategory: PropTypes.string,
      serviceDescription: PropTypes.string,
    }),
    ratings: PropTypes.array,
    dateCreated: PropTypes.string,
    providerName: PropTypes.string,
  }).isRequired,
};
