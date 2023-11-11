import styles from "./style.module.css";
import LinkButton from "@/components/Link";
import Logo from "@/assets/logo.svg";
import Search from "@/assets/images/search.svg";
import Burger from "@/assets/images/burger.svg";
import Image from "@/components/Image";
import Button from "@/components/Button";

export default function MobileNav() {
  return (
    <div className={styles.mobileNavbar}>
      <LinkButton to="/" className={styles.logoLink}>
        <Image src={Logo} alt="Logo" className={styles.logoLinkImg} />
      </LinkButton>
      <div>
        <Button className={styles.btn}>
          <Image src={Search} alt="Search" />
        </Button>
        <Button className={styles.btn}>
          <Image src={Burger} alt="Burger" />
        </Button>
      </div>
    </div>
  );
}
