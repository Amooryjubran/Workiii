import styles from "./style.module.css";
import PropTypes from "prop-types";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";

const ServiceCard = ({ service, index, middleIndex }) => {
  const windowWidth = useWindowWidth();

  return (
    <div
      className={`${styles.serivesCard} ${
        index === middleIndex && windowWidth > 1028 ? styles.highlight : ""
      }`}
      key={index}
    >
      <Image src={service.img} alt={service.alt} className={styles.img} />
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <LinkButton to={service.link}>See more</LinkButton>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  middleIndex: PropTypes.number.isRequired,
};

export default ServiceCard;
