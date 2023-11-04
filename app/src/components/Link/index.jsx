import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import useLanguageSelector from "@/store/useLanguageSelector";

const LinkButton = ({ to, children, className }) => {
  const { selectedLanguage } = useLanguageSelector();

  let fullPath;
  if (to === "/") {
    fullPath = `/${selectedLanguage}`;
  } else {
    fullPath = `/${selectedLanguage}/${to}`;
  }

  const optionalClassName = className ? ` ${className}` : "";
  return (
    <Link to={fullPath} className={`${styles.linkButton}${optionalClassName}`}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default LinkButton;
