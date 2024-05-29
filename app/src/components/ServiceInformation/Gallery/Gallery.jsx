import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Grid, Share, Heart } from "react-feather";
import GalleryModal from "./GalleryModal";
import styles from "./style.module.css";
import Image from "../../Image";
import Button from "../../Button";
import SkeletonImg from "images/skeleton.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "./sliderSettings";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import LinkButton from "@/components/Link";
export default function Gallery({ images }) {
  const { t } = useTranslation();
  const windowSize = useWindowWidth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const settings = sliderSettings(handleSlideChange);

  if (windowSize <= 1028) {
    return (
      <div className={styles.serivesCardsWrapper}>
        <Slider {...settings} className={styles.serivesCards}>
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image?.src}
              classNameWrapper={styles.carouselImgWrapper}
              className={styles.carouselImg}
            />
          ))}
        </Slider>
        <div className={styles.slideCount}>
          {currentSlide + 1} / {images.length}
        </div>
        <div className={styles.serivesCardsHeader}>
          <LinkButton to="services" className={styles.carouselBackBtn}>
            <ChevronLeft color="white" size={18} />
          </LinkButton>
          <div>
            <Button>
              <Share color="white" size={18} />
            </Button>
            <Button>
              <Heart color="white" size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
