# Input Component

A reusable `Input` component for handling user inputs in forms.

### Usage

```jsx
import { useState } from "react";
import Input from "@/components/Input";
import styles from "./styles.module.css";

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      type="text"
      name="myInput"
      value={inputValue}
      onChange={handleChange}
      placeholder="Type something..."
      className={styles.myInputStyle}
    />
  );
};
```
