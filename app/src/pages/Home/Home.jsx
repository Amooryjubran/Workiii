import styles from "./style.module.css";
import HeroBanner from "@/components/ui/Home/HeroBanner";
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <HeroBanner />
    </div>
  );
}
