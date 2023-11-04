Example on how to use the Image Component

```jsx
const ExampleComponent = () => {
  const handleClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div>
      <Button onClick={handleClick}>Click Me</Button>
      <Button onClick={handleClick} className="special-button">
        Special Button
      </Button>
      <Button disabled>Disabled Button</Button>
    </div>
  );
};
```
