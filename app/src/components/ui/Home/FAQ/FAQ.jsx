import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { ChevronUp } from "react-feather";
import Button from "@/components/Button";
import Image from "@/components/Image";
import HandyMan from "images/Home/plumber.png";
import Electrician from "images/Home/Electrician.png";
import LinkButton from "@/components/Link";

// Define a single FAQ item component
const FAQItem = ({ faqKey, isOpen, toggleOpen }) => {
  const { t } = useTranslation();
  const questionKey = `home.faq.question${faqKey}`;
  const answerKey = `home.faq.answer${faqKey}`;
  return (
    <div className={styles.faqItem} onClick={toggleOpen}>
      <Button className={styles.faqButton}>
        <span>{t(questionKey)}</span>
        <ChevronUp
          className={isOpen ? styles.chevron : styles.chevronDown}
          width={24}
          height={24}
          color="black"
        />
      </Button>
      {isOpen && (
        <div className={styles.faqContent}>
          <p>{t(answerKey)}</p>
        </div>
      )}
    </div>
  );
};

// Main FAQ component
export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(HandyMan);
  const [animationClass, setAnimationClass] = useState(styles.fadeIn);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationClass(styles.fadeOut);

      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === HandyMan ? Electrician : HandyMan
        );
        setAnimationClass(styles.fadeIn);
      }, 1000); // This timeout must match the CSS transition duration
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  const toggleOpen = (index) => {
    // Toggle logic that allows only one item to be open at a time
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const faqKeys = Array.from({ length: 4 }, (_, i) => i + 1);

  return (
    <div className={styles.faqWrapper}>
      <div className={styles.faqTitle}>
        <h1>{t("home.faq.title")}</h1>
        <p>{t("home.faq.description")}</p>
      </div>

      <div className={styles.faqContainer}>
        <div className={styles.faqS}>
          {faqKeys.map((key, index) => (
            <FAQItem
              key={index}
              faqKey={key}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
        <div className={styles.faqIMGWrapper}>
          <div className={animationClass}>
            <Image
              src={currentImage}
              alt="Handyman or Electrician"
              className={styles.faqIMG}
              classNameWrapper={styles.faqWrapperIMG}
            />
          </div>
        </div>
      </div>
      <LinkButton to="faq" className={styles.faqLink}>
        {t("landingPage.seeMore")}
      </LinkButton>
    </div>
  );
}

// Prop types for FAQItem
FAQItem.propTypes = {
  faqKey: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};
