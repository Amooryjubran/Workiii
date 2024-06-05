import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { X } from "react-feather";
import Button from "../../Button";
import Image from "@/components/Image";
export default function GalleryModal({ images, closeModal }) {
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedImg, setSelectedImgs] = useState(null);
  return (
    <div className={styles.GalleryModal}>
      <Button onClick={closeModal} className={styles.GalleryModalCloseBtn}>
        <X />
      </Button>
      <div className={styles.GalleryModalImgs}>
        <div className={styles.GalleryModalImgsWrapper}>
          {images?.map((image, index) => (
            <Image
              src={image.src || image}
              key={index}
              classNameWrapper={styles.GalleryImg}
              alt={`Labourer-Img-${index}`}
              onClick={() => {
                setFullScreen(true);
                setSelectedImgs(image.src || image);
              }}
            />
          ))}
        </div>
      </div>
      {fullScreen && (
        <div className={styles.fullScreenImg}>
          <Button
            className={styles.fullScreenImgCloseBtn}
            onClick={() => {
              setFullScreen(false);
              setSelectedImgs(null);
            }}
          >
            <X color="white" />
          </Button>
          <Image
            alt={`Labourer-fullScreen`}
            src={selectedImg}
            classNameWrapper={styles.fullScreenImgWrapper}
          />
        </div>
      )}
    </div>
  );
}
GalleryModal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
};
