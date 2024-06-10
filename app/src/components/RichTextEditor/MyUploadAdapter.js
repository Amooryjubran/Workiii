class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", import.meta.env.VITE_IMG_NAME);

          fetch(import.meta.env.VITE_IMG_CODE, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.secure_url) {
                resolve({
                  default: data.secure_url,
                });
              } else {
                reject(data.error);
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {
    // Reject the promise returned from the upload() method.
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
