import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "../Image";
import Arrow from "images/ListAService/arrow.svg";
import X from "images/cross.svg";
import ImageUploadImg from "images/ListAService/image-upload.svg";
import styles from "./style.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${styles.arrows} ${className}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image src={Arrow} alt="Previous" />
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${styles.arrows} ${className}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image
        src={Arrow}
        style={{ ...style, display: "block", transform: "rotate(180deg)" }}
        alt="Previous"
      />
    </div>
  );
}

CustomPrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

CustomNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default function ImageUpload({ images, setImages }) {
  const { t } = useTranslation();
  const inputRef = useRef();
  const windowWidth = useWindowWidth();

  const handleImageChange = (event) => {
    const fileList = Array.from(event.target.files);
    const newImages = fileList.map((file) => ({
      src: URL.createObjectURL(file),
      isDefault: false,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSetDefault = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.forEach((img) => (img.isDefault = false));
      newImages[index].isDefault = true;
      return [
        newImages[index],
        ...newImages.slice(0, index),
        ...newImages.slice(index + 1),
      ];
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: windowWidth >= 1028 ? 4 : 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className={styles.imageUpload}>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <div
        className={styles.uploadTrigger}
        onClick={() => inputRef.current.click()}
      >
        <Image src={ImageUploadImg} alt={t("listAServiceServicesTab.drag")} />
        <span>
          {t("listAServiceServicesTab.drag")}{" "}
          <strong>{t("listAServiceServicesTab.browse")}</strong>
        </span>
      </div>
      {!!images.length && (
        <span>{t("listAServiceServicesTab.chooseCover")}</span>
      )}
      {images.length > 0 && (
        <Slider
          {...sliderSettings}
          key={images.length}
          className={styles.slickContainer}
        >
          {images?.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={image.src} className={styles.image} />
              <input
                type="checkbox"
                checked={image.isDefault}
                onChange={() => handleSetDefault(index)}
                className={styles.checkbox}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className={styles.removeButton}
              >
                <Image src={X} alt="x" classNameWrapper={styles.removeBtn} />
              </button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

ImageUpload.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      isDefault: PropTypes.bool,
    })
  ).isRequired,
  setImages: PropTypes.func.isRequired,
};
