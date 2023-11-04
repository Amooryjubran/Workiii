# Input Component

A reusable Image component for efficiently loading images with a fallback and skeleton loading state.

### Usage

```jsx
import Image from "@/components/Image";
import styles from "./styles.module.css";

const MyComponent = () => {
  return (
    <Image
      src="path_to_image.jpg"
      alt="Descriptive alt text"
      fallbackSrc="path_to_fallback_image.jpg"
      width={300}
      height={200}
      className={styles.myImageStyle}
    />
  );
};
```
