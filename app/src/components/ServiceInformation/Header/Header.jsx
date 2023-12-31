import styles from "./style.module.css";
import PropTypes from "prop-types";
import Image from "@/components/Image";
import Button from "@/components/Button";
import LocationImg from "images/Service/location.svg";
import PDFIMG from "images/Service/pdf.svg";
import DownloadImg from "images/Service/download.svg";
import StarImg from "images/Service/star.svg";

export default function Header({
  location,
  serviceTitle,
  serviceCategory,
  ratings,
  pageType,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.headerInfo}>
        <div className={styles.headerInfoLocation}>
          <Image src={LocationImg} alt={location?.city} />
          {location.street}, {location.city}, {location.state}
        </div>
        <div className={styles.headerInfoTitle}>
          <h1>{serviceTitle}</h1>
          <span>{serviceCategory}</span>
        </div>
        <div className={styles.headerRating}>
          <Image src={StarImg} alt="ratings" />
          {ratings?.length == 0 ? 0 : 15}({ratings?.length})
        </div>
      </div>
      {pageType === "DASHBOARD" && (
        <Button className={styles.headerBtn}>
          <div>
            <Image src={PDFIMG} alt="Pdf" />
            <div className={styles.headerBtnInfo}>
              <span>filename.pdf</span>
              <p>5 MB</p>
            </div>
          </div>
          <Image src={DownloadImg} alt="download" />
        </Button>
      )}
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    street: PropTypes.string,
    state: PropTypes.string,
  }),
  serviceTitle: PropTypes.string,
  serviceCategory: PropTypes.string,
  pageType: PropTypes.string,
  ratings: PropTypes.array,
};
