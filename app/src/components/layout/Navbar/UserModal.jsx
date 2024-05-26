import { func, shape, string, oneOfType, instanceOf } from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/useUserStore";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import Image from "@/components/Image";
import {
  LogOut,
  User,
  Home,
  Layout,
  Mail,
  X,
  Briefcase,
  Users,
  Clipboard,
  HelpCircle,
  LogIn,
  UserPlus,
} from "react-feather";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Logo from "@/assets/logo.svg";

export default function UserModal({ innerRef, setUserModal, user }) {
  const windowWidth = useWindowWidth();
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (windowWidth <= 1028 && !user) {
    return (
      <div className={styles.profileDropDown} ref={innerRef}>
        <Button
          onClick={() => setUserModal(false)}
          className={styles.profileDropDownHeaderBtn}
        >
          <LinkButton
            onClick={() => setUserModal(false)}
            to="/"
            className={styles.profileDropDownImgContainer}
          >
            <Image
              src={Logo}
              alt="Logo"
              className={styles.logoLinkImg}
              classNameWrapper={styles.logoLinkImgUserModel}
            />
          </LinkButton>
        </Button>
        <Button className={styles.closeBtn} onClick={() => setUserModal(false)}>
          <X size={18} color="black" />
        </Button>
        <div className={styles.profileNav}>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="/">
              <Home color="#181340" size={18} />
              <span>{t("navbar.home")}</span>
            </LinkButton>
          </Button>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="services">
              <Briefcase color="#181340" size={18} />
              <span>{t("landingPage.services")}</span>
            </LinkButton>
          </Button>
        </div>
        <div className={styles.profileNav}>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="about">
              <Users color="#181340" size={18} />
              <span>{t("navbar.about")}</span>
            </LinkButton>
          </Button>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="terms">
              <Clipboard color="#181340" size={18} />
              <span>{t("navbar.terms")}</span>
            </LinkButton>
          </Button>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="faq">
              <HelpCircle color="#181340" size={18} />
              <span>{t("home.faq.title")}</span>
            </LinkButton>
          </Button>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton onClick={() => setUserModal(false)} to="contact">
              <Mail color="#181340" size={18} />
              <span>{t("navbar.contact")}</span>
            </LinkButton>
          </Button>
        </div>
        <div className={styles.mobileFooter}>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton to="login" className={styles.profileDropDownLogout}>
              <LogIn color="#181340" size={18} />
              <span>{t("navbar.login")}</span>
            </LinkButton>
          </Button>
          <Button onClick={() => setUserModal(false)}>
            <LinkButton to="sign-up" className={styles.profileDropDownLogout}>
              <UserPlus color="#181340" size={18} />
              <span>{t("navbar.signUp")}</span>
            </LinkButton>
          </Button>
        </div>
      </div>
    );
  }
  const { name, profileImg, email } = user;

  return (
    <div className={styles.profileDropDown} ref={innerRef}>
      <Button
        onClick={() => setUserModal(false)}
        className={styles.profileDropDownHeaderBtn}
      >
        <LinkButton
          onClick={() => setUserModal(false)}
          to="profile"
          className={styles.profileDropDownImgContainer}
        >
          <div className={styles.profileDropDownImgWrapper}>
            {profileImg ? (
              <Image
                src={profileImg}
                alt={name}
                classNameWrapper={styles.profileImage}
              />
            ) : (
              <div className={styles.profileInitial}>{name?.charAt(0)}</div>
            )}
          </div>
          <div className={styles.profileDropDownHeader}>
            <h1>{user?.name || ""}</h1>
            <span>{email}</span>
          </div>
        </LinkButton>
      </Button>

      <div className={styles.profileNav}>
        <Button onClick={() => setUserModal(false)}>
          <LinkButton onClick={() => setUserModal(false)} to="/">
            <Home color="#181340" size={18} />
            <span>{t("navbar.home")}</span>
          </LinkButton>
        </Button>
        <Button onClick={() => setUserModal(false)}>
          <LinkButton onClick={() => setUserModal(false)} to="profile">
            <User color="#181340" size={18} />
            <span>{t("profile.MyProfile")}</span>
          </LinkButton>
        </Button>
        <Button onClick={() => setUserModal(false)}>
          <LinkButton onClick={() => setUserModal(false)} to="dashboard">
            <Layout color="#181340" size={18} />
            <span>{t("navbar.dashboard")}</span>
          </LinkButton>
        </Button>
      </div>
      <div className={styles.profileNav}>
        <Button onClick={() => setUserModal(false)}>
          <LinkButton onClick={() => setUserModal(false)} to="contact">
            <Mail color="#181340" size={18} />
            <span>{t("navbar.contact")}</span>
          </LinkButton>
        </Button>
      </div>
      <Button
        onClick={() => {
          setUserModal(false);
          logout();
          navigate("/");
        }}
        className={styles.profileDropDownLogout}
      >
        <LogOut color="#181340" size={18} />
        <span>{t("navbar.logout")}</span>
      </Button>
      {windowWidth <= 1028 && (
        <Button className={styles.closeBtn} onClick={() => setUserModal(false)}>
          <X size={18} color="black" />
        </Button>
      )}
    </div>
  );
}
UserModal.propTypes = {
  innerRef: oneOfType([func, shape({ current: instanceOf(Element) })]),
  setUserModal: func.isRequired,
  user: shape({
    email: string.isRequired,
    image: string,
    fullName: string,
  }).isRequired,
};
