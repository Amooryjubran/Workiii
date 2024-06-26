import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Logo from "@/assets/logo.svg";
import {
  ChevronDown,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  Check,
} from "react-feather";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import useLanguageSelector from "@/store/useLanguageSelector";
import useClickOutside from "@/hooks/useClickOutside";
import i18n from "@/config/i18n";

export default function Footer() {
  const [langModel, setLangModel] = useState(false);
  const windowWidth = useWindowWidth();
  const { selectedLanguage, setLanguage } = useLanguageSelector();
  const langModelRef = useRef(null);

  useClickOutside(langModelRef, () => setLangModel(false));

  const languageFullNames = {
    en: "English",
    fr: "Français",
    ar: "العربية",
  };

  const toggleLanguageModel = () => {
    setLangModel((current) => !current);
  };
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLanguage(code);
    setLangModel(false);
    const newPathname = window.location.pathname.replace(
      /\/(en|fr|ar)/,
      `/${code}`
    );
    window.history.pushState({}, "", newPathname);
  };
  return (
    <div className={styles.footer}>
      <div className={styles.footerHeader}>
        <FooterSection
          title="Workiii"
          links={["Support", "Support", "Support", "Support", "Support"]}
        />
        <FooterSection
          title="Features"
          links={["Support", "Support", "Support", "Support", "Support"]}
        />
        <FooterSection
          title="Privacy"
          links={["Support", "Support", "Support", "Support", "Support"]}
        />
        <FooterSection
          title="Company"
          links={["Support", "Support", "Support", "Support", "Support"]}
        />
        <div className={styles.footerHeaderList}>
          <h1>Language</h1>
          <div className={styles.footerLanguageBtnWrapper}>
            <Button
              className={styles.footerLanguageBtn}
              onClick={toggleLanguageModel}
            >
              <div>
                <Globe color="white" size={18} />
                <span>{languageFullNames[selectedLanguage]}</span>
              </div>
              <ChevronDown
                color="white"
                className={langModel ? styles.checvBottom : styles.checvTop}
              />
            </Button>
            {langModel && (
              <div ref={langModelRef} className={styles.langModel}>
                {Object.entries(languageFullNames).map(([code, name]) => (
                  <Button
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={styles.langOption}
                  >
                    {name}
                    {code === selectedLanguage ? (
                      <Check size={18} />
                    ) : (
                      <Check style={{ opacity: "0" }} />
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {windowWidth >= 1028 && (
            <>
              <h1>Social</h1>
              <div className={styles.footerSocial}>
                <LinkButton>
                  <Twitter />
                </LinkButton>
                <LinkButton>
                  <Facebook />
                </LinkButton>
                <LinkButton>
                  <Instagram />
                </LinkButton>
                <LinkButton>
                  <Youtube />
                </LinkButton>
                <LinkButton>
                  <Linkedin />
                </LinkButton>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.footerBottom}>
        <Image src={Logo} alt="Workii" classNameWrapper={styles.footerLogo} />
        <ul>
          <li>User Agreement</li>
          <li>Privacy Statement</li>
          <li>Responsible Disclosure</li>
        </ul>
        <span>Copyright © 2024 Montreal. All rights reserved.</span>
      </div>
      {windowWidth < 1028 && (
        <div className={styles.footerSocial}>
          <LinkButton>
            <Twitter />
          </LinkButton>
          <LinkButton>
            <Facebook />
          </LinkButton>
          <LinkButton>
            <Instagram />
          </LinkButton>
          <LinkButton>
            <Youtube />
          </LinkButton>
          <LinkButton>
            <Linkedin />
          </LinkButton>
        </div>
      )}
    </div>
  );
}

function FooterSection({ title, links }) {
  return (
    <div className={styles.footerHeaderList}>
      <h1>{title}</h1>
      <div>
        {links.map((link, index) => (
          <LinkButton key={index}>{link}</LinkButton>
        ))}
      </div>
    </div>
  );
}

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
};
