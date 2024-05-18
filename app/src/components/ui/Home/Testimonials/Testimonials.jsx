import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getSettings, getItems } from "./sliderSettings";
import MainQuoteContainer from "./MainQuoteContainer";
import styles from "./style.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderSettings = getSettings(setCurrentIndex);
  const testimonialItems = getItems(t);

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.title}>{t("home.testimonials.title")}</h2>
      <p className={styles.subtitle}>{t("home.testimonials.subtitle")}</p>

      <div className={styles.sliderWrapper}>
        <MainQuoteContainer
          quote={testimonialItems[currentIndex].quote}
          name={testimonialItems[currentIndex].name}
          role={testimonialItems[currentIndex].role}
        />

        <Slider {...sliderSettings} className={styles.sliderSlick}>
          {testimonialItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.slideItem} ${
                index === currentIndex ? styles.firstSlideItem : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className={`${styles.slideImage} ${
                  index === currentIndex ? styles.firstSlideImage : ""
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
