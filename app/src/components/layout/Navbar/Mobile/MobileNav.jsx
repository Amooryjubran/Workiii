import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import styles from "../style.module.css";
import LinkButton from "@/components/Link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Logo from "@/assets/logo.svg";
import Search from "@/assets/images/search.svg";
import Burger from "@/assets/images/burger.svg";
import UserModal from "../UserModal";
import useUserStore from "@/store/useUserStore";

export default function MobileNav() {
  const { user } = useUserStore();
  const [modal, setModal] = useState(false);
  const ref = useRef();
  useClickOutside(ref, () => setModal(false));

  return (
    <>
      <div className={styles.mobileNavbar}>
        <LinkButton to="/" className={styles.logoLink}>
          <Image
            src={Logo}
            alt="Logo"
            className={styles.logoLinkImg}
            classNameWrapper={styles.logoLinkImgWrapper}
          />
        </LinkButton>
        <div>
          <Button className={styles.btn}>
            <Image src={Search} alt="Search" />
          </Button>
          <Button className={styles.btn} onClick={() => setModal(true)}>
            <Image src={Burger} alt="Burger" />
          </Button>
        </div>
      </div>
      {modal && (
        <UserModal setUserModal={setModal} user={user} innerRef={ref} />
      )}
    </>
  );
}
