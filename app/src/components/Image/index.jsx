// Image.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const Image = ({
  src,
  alt,
  fallbackSrc,
  width,
  height,
  className,
  classNameWrapper,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState("loading");

  const handleImageLoad = () => {
    setImageStatus("loaded");
  };

  const handleImageError = () => {
    setImageStatus("error");
  };

  return (
    <div
      className={`${styles.imageWrapper} ${classNameWrapper}`}
      style={{ width, height }}
    >
      {imageStatus === "loading" && (
        <div data-testid="skeleton" className={styles.skeleton}></div>
      )}

      <img
        src={imageStatus === "error" ? fallbackSrc : src}
        alt={alt}
        className={`${styles.image} ${className}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageStatus === "loading" ? "none" : "block" }}
        {...props}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

Image.defaultProps = {
  fallbackSrc: "path_to_fallback_image.jpg",
  width: "auto",
  height: "auto",
  className: "",
};

export default Image;
