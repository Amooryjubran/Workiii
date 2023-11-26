import styles from "./style.module.css";
import ImageUpload from "@/components/ImageUpload";
import useListAServiceStore from "@/store/useListAServiceStore";

export default function Images() {
  const { images, setImages } = useListAServiceStore((state) => ({
    images: state.images,
    setImages: state.setImages,
  }));
  return (
    <div className={styles.imageContainer}>
      <ImageUpload images={images} setImages={setImages} />
    </div>
  );
}
