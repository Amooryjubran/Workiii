import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Grid } from "react-feather";
import GalleryModal from "./GalleryModal";
import styles from "./style.module.css";
import Image from "../../Image";
import Button from "../../Button";
import SkeletonImg from "images/skeleton.jpeg";
export default function Gallery({ images }) {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.gallery}>
      <div>
        <Image
          classNameWrapper={styles.galleryImg}
          src={images[0]?.src || SkeletonImg}
          alt="Service-img"
        />
      </div>
      <div className={styles.galleryColumns}>
        <Image
          classNameWrapper={styles.galleryImg}
          className={styles.galleryInnerImg}
          src={images[1]?.src || SkeletonImg}
          alt="Service-img"
        />
        <Image
          classNameWrapper={styles.galleryImg}
          className={styles.galleryInnerImg}
          src={images[2]?.src || SkeletonImg}
          alt="Service-img"
        />
      </div>
      <div className={styles.galleryColumns}>
        <Image
          classNameWrapper={styles.galleryImg}
          className={styles.galleryInnerImg}
          src={images[3]?.src || SkeletonImg}
          alt="Service-img"
        />
        <Image
          classNameWrapper={styles.galleryImg}
          className={styles.galleryInnerImg}
          src={images[4]?.src || SkeletonImg}
          alt="Service-img"
        />
      </div>
      {!!images.length && (
        <>
          <Button className={styles.showAllImgsBtn} onClick={openModal}>
            <Grid />
            <h1>{t("dashboard.ShowImages")}</h1>
          </Button>
          {isModalOpen && (
            <GalleryModal images={images} closeModal={closeModal} />
          )}
        </>
      )}
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
};
