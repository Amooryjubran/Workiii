# Link Component

## Overview

The `Link` component is a reusable component designed to simplify the creation of navigational links in your application. It wraps `react-router-dom`'s `Link` component to facilitate client-side navigation between routes while allowing for additional styling and functionality.

## Props

- **to** (string): The URL to navigate to when the link is clicked. _Required_.
- **children** (node): The content to be displayed within the link. This could be text, an image, or other inline HTML or components. _Required_.
- **className** (string): A class name that will be applied to the `Link` component for additional styling. _Optional_.

## Usage

### Import

First, ensure that the `Link` component is imported in the component where it's needed:

```jsx
import LinkButton from "@/components/Link";

<LinkButton to="/destination-path" className={styles.customBtn}>
  Link Text
</LinkButton>;
```
