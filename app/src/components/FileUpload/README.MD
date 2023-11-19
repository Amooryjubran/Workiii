Example on how to use the File Upload Component

```jsx
const ExampleComponent = () => {
  const [state, setState] = useState(null);
  const handleFileSelect = (file) => {
    if (file) {
      // Update the state with the file
      setState({ serviceCertificate: file });
    }
  };

  return (
    <div>
      <FileUpload
        onFileSelect={(event) => handleFileSelect(event.target.files[0])}
        accept=".pdf" // Accept only PDF files
        buttonText="Upload Certificate"
      />
    </div>
  );
};
```
