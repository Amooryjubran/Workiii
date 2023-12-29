import PropTypes from "prop-types";
import styles from "../style.module.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import LinkButton from "@/components/Link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Logo from "@/assets/logo.svg";
import X from "images/cross.svg";
import FB from "images/Home/FB.svg";
import IG from "images/Home/IG.svg";
import Twitter from "images/Home/X.svg";
import LI from "images/Home/LI.svg";

export default function SideBar({ innerRef, setModal }) {
  const { t } = useTranslation();

  useLockBodyScroll();

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className={styles.mobileSiderbar} ref={innerRef}>
      <div>
        <div className={styles.header}>
          <Button className={styles.logoLinkSidebar} onClick={handleCloseModal}>
            <LinkButton to="/">
              <Image src={Logo} alt="Logo" className={styles.logoLinkImg} />
            </LinkButton>
          </Button>
          <Button className={styles.headerClose} onClick={handleCloseModal}>
            <Image src={X} alt="Close" />
          </Button>
        </div>
        <div className={styles.mobileNav}>
          <Button onClick={handleCloseModal}>
            <LinkButton to="/">{t("navbar.home")}</LinkButton>
          </Button>
          <Button onClick={handleCloseModal}>
            <LinkButton to="services">{t("navbar.services")}</LinkButton>
          </Button>
          <Button onClick={handleCloseModal}>
            <LinkButton to="reviews">{t("navbar.reviews")}</LinkButton>
          </Button>
          <Button onClick={handleCloseModal}>
            <LinkButton to="about">{t("navbar.about")}</LinkButton>
          </Button>
        </div>
      </div>
      <div>
        <div className={styles.mobileLinks}>
          <Button onClick={handleCloseModal}>
            <LinkButton to="services">{t("navbar.terms")}</LinkButton>
          </Button>
          <Button onClick={handleCloseModal}>
            <LinkButton to="reviews">{t("navbar.privacy")}</LinkButton>
          </Button>
        </div>
        <div className={styles.mobileSocialMedia}>
          <Image src={FB} alt={"Facebook"} />
          <Image src={IG} alt={"Instagram"} />
          <Image src={Twitter} alt={"Twitter"} />
          <Image src={LI} alt={"Linkedin"} />
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  setModal: PropTypes.func,
};
