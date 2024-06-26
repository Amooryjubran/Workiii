import PropTypes from "prop-types";
import styles from "./style.module.css";

const Button = ({
  onClick = () => {},
  children,
  disabled = false,
  type = "button",
  color,
  borderColor,
  textColor,
  className,
}) => {
  const customStyles = {
    backgroundColor: color,
    borderColor: borderColor,
    color: textColor,
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      style={customStyles}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  color: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
