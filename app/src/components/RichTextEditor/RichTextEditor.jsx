import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import styles from "./style.module.css";
import Button from "../Button";
import { MyCustomUploadAdapterPlugin } from "./MyUploadAdapter";

const RichTextEditor = ({ value, onChange }) => {
  const [tab, setTab] = useState(0);
  const [text, setText] = useState(value || "");

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setText(data);
    if (onChange) {
      onChange(data);
    }
  };

  // Define tab configuration
  const tabs = [
    {
      label: "Edit",
      content: (
        <CKEditor
          editor={ClassicEditor}
          data={text}
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          onChange={handleEditorChange}
        />
      ),
    },
    {
      label: "Preview",
      content: (
        <div
          className={`${styles.previewContainer} ck-content`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
    },
  ];

  return (
    <div className={styles.richTextContainer}>
      <div className={styles.richTextTabs}>
        {tabs.map((tabInfo, index) => (
          <Button
            key={index}
            onClick={() => setTab(index)}
            className={tab === index ? styles.active : ""}
          >
            {tabInfo.label}
          </Button>
        ))}
      </div>
      <div className={styles.editorContainer}>{tabs[tab].content}</div>
    </div>
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
