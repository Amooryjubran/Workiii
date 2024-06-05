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

export default function ImageUpload({ images, setImages, hideArrows }) {
  console.log(hideArrows);
  const { t } = useTranslation();
  const inputRef = useRef();
  const windowWidth = useWindowWidth();

  const handleImageChange = async (event) => {
    const fileList = Array.from(event.target.files);

    const uploadPromises = fileList.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_IMG_NAME);

      return fetch(import.meta.env.VITE_IMG_CODE, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const newImages = uploadedImages.map((img) => ({
      src: img.secure_url,
      isDefault: false,
    }));

    setImages([...images, ...newImages]);
  };

  const handleSetDefault = (index) => {
    const newImages = images.map((img, idx) => ({
      ...img,
      isDefault: idx === index,
    }));
    const defaultImage = newImages.splice(index, 1)[0];
    newImages.unshift(defaultImage);
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: windowWidth >= 1028 ? 4 : 2,
    slidesToScroll: 1,
    arrows: !hideArrows,
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
  hideArrows: PropTypes.bool,
};
