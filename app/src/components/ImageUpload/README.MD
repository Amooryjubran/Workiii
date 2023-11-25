Example on how to use the Images Upload Slider

```jsx
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

const ExampleComponent = () => {
  const [images, setImages] = useState([]);
  return (
    <div>
      <ImageUpload images={images} setImages={setImages} />
    </div>
  );
};
```
