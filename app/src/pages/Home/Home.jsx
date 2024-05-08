import { Suspense, lazy } from "react";
import HeroBanner from "@/components/ui/Home/HeroBanner";
import { motion } from "framer-motion";
import styles from "./style.module.css";

// Lazily load the other components
const Services = lazy(() => import("@/components/ui/Home/Services"));
const PopularServices = lazy(() =>
  import("@/components/ui/Home/PopularServices")
);

const Banner = lazy(() => import("@/components/ui/Home/Banner"));

export default function Home() {
  // Animation variants
  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0 },
    },
  };

  return (
    <div className={styles.wrapper}>
      <HeroBanner />
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={variants}
        >
          <Services />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
        >
          <PopularServices />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
        >
          <Banner />
        </motion.div>
      </Suspense>
    </div>
  );
}
