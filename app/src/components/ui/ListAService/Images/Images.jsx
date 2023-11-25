import { useState } from "react";
import styles from "./style.module.css";
import ImageUpload from "@/components/ImageUpload";

export default function Images() {
  const [images, setImages] = useState([]);
  return (
    <div className={styles.imageContainer}>
      <ImageUpload images={images} setImages={setImages} />
    </div>
  );
}
