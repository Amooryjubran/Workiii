import { useRef } from "react";
import PropTypes from "prop-types";

const FileUpload = ({ onFileSelect, accept, buttonText, className }) => {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      <button onClick={triggerFileInput}>{buttonText}</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        style={{ display: "none" }}
        accept={accept}
      />
    </div>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  accept: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
};

FileUpload.defaultProps = {
  accept: "",
  buttonText: "Upload",
  className: "",
};

export default FileUpload;
