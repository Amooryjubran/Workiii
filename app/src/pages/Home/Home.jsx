import { Suspense, lazy } from "react";
import HeroBanner from "@/components/ui/Home/HeroBanner";
import styles from "./style.module.css";

// Lazily load the other components
const Services = lazy(() => import("@/components/ui/Home/Services"));
const PopularServices = lazy(() =>
  import("@/components/ui/Home/PopularServices")
);
const Banner = lazy(() => import("@/components/ui/Home/Banner"));
export default function Home() {
  return (
    <div className={styles.wrapper}>
      <HeroBanner />
      <Suspense fallback={<div>...</div>}>
        <Services />
        <PopularServices />
        <Banner />
      </Suspense>
    </div>
  );
}
