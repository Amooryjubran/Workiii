import styles from "./style.module.css";
import PropTypes from "prop-types";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";

const ServiceCard = ({ service, index }) => {
  return (
    <LinkButton className={styles.serivesCard} key={index} to="services">
      <Image
        src={service.img}
        classNameWrapper={styles.serviceImageWrapper}
        alt={service.title}
      />
      <div className={styles.serivesCardHeader}>
        <span>{service.description}</span>
        <h1>{service.title}</h1>
      </div>
    </LinkButton>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
