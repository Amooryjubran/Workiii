import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import i18n from "@/config/i18n";
import styles from "./style.module.css";
import Image from "@/components/Image";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import Logo from "@/assets/logo.svg";
import Search from "@/assets/images/search.svg";
import useLanguageSelector from "@/store/useLanguageSelector";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import useClickOutside from "@/hooks/useClickOutside";
import MobileNav from "./Mobile";
import ProfileHeader from "./ProfileHeader";
import useUserStore from "@/store/useUserStore";
import { isPathExcluded } from "@/helpers/pathHelper";
import UserModal from "./UserModal";

export default function Navbar() {
  const { user } = useUserStore();
  const { t } = useTranslation();
  const [langModal, setLangModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const ref = useRef();
  const { setLanguage } = useLanguageSelector();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  useClickOutside(ref, () => setUserModal(false));

  const currentLanguage = i18n.language;
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "ar", label: "Arabic" },
  ];

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setLangModal(false);
    setLanguage(newLanguage);
    const newPathname = window.location.pathname.replace(
      /\/(en|fr|ar)/,
      `/${newLanguage}`
    );
    navigate(newPathname);
  };

  const pathsToExclude = [
    `/${currentLanguage}/dashboard`, // Dashboard Page,
  ];

  if (isPathExcluded(location.pathname, pathsToExclude)) return null;

  if (windowWidth <= 1024) {
    return <MobileNav />;
  }
  return (
    <div className={styles.navbar}>
      <div>
        <LinkButton to="/" className={styles.logoLink}>
          <Image
            src={Logo}
            alt="Logo"
            className={styles.logoLinkImg}
            classNameWrapper={styles.logoLinkImgWrapper}
          />
        </LinkButton>
      </div>
      <div className={styles.navbarNavigations}>
        <LinkButton to="/" className={styles.navbarLinks}>
          {t("navbar.home")}
        </LinkButton>
        <LinkButton to="services" className={styles.navbarLinks}>
          {t("navbar.services")}
        </LinkButton>
        <LinkButton to="reviews" className={styles.navbarLinks}>
          {t("navbar.reviews")}
        </LinkButton>
        <LinkButton to="about" className={styles.navbarLinks}>
          {t("navbar.about")}
        </LinkButton>
      </div>
      <div className={styles.navbarBtns}>
        <div>
          <Button>
            <Image src={Search} alt="search" />
          </Button>
        </div>
        <div>
          <Button onClick={() => setLangModal(true)}>
            <span>{currentLanguage}</span>
            <ChevronDown size={18} />
          </Button>
          {langModal && (
            <ul className={styles.langModal}>
              {languageOptions.map((option) => (
                <li
                  key={option.code}
                  onClick={() => changeLanguage(option.code)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {user ? (
          <div className={styles.profileHeaderWrapper}>
            <ProfileHeader user={user} setUserModal={setUserModal} />
            {userModal && (
              <UserModal
                setUserModal={setUserModal}
                user={user}
                innerRef={ref}
              />
            )}
          </div>
        ) : (
          <>
            <LinkButton to="login" className={styles.navbarLinksLogin}>
              {t("navbar.login")}
            </LinkButton>
            <LinkButton to="sign-up" className={styles.navbarLinks}>
              {t("navbar.signUp")}
            </LinkButton>
          </>
        )}
      </div>
    </div>
  );
}
