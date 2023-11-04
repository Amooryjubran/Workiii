import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const Input = React.forwardRef(
  ({ type, name, value, onChange, placeholder, className, ...rest }, ref) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      ref={ref}
      {...rest}
    />
  )
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  className: "",
};

export default Input;
