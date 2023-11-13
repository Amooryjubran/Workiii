import Services from "@/components/ui/Home/Services";
import styles from "./style.module.css";
import HeroBanner from "@/components/ui/Home/HeroBanner";
import PopularServices from "@/components/ui/Home/PopularServices";
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <HeroBanner />
      <Services />
      <PopularServices />
    </div>
  );
}
