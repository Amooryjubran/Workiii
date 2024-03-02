import useUserStore from "@/store/useUserStore";
import { func, shape, string, oneOfType, instanceOf } from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

export default function UserModal({ innerRef, setUserModal, user }) {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.profileDropDown} ref={innerRef}>
      <Button onClick={() => setUserModal(false)}>
        <LinkButton
          onClick={() => setUserModal(false)}
          to="profile"
          className={styles.profileDropDownImgContainer}
        >
          <div className={styles.profileDropDownImgWrapper}>
            {/* <img src={user.profileImg || UserImg} alt={user.email} />
          <img src={UserImgEdit} alt="edit" /> */}
          </div>
          <span>{user?.name || ""}</span>
        </LinkButton>
      </Button>

      <Button
        onClick={() => {
          setUserModal(false);
          logout();
          navigate("/");
        }}
        className={styles.profileDropDownLogout}
      >
        {/* <img src={Logout} alt="Logout" /> */}
        <span>{t("UserModal.Logout")}</span>
      </Button>
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
