import styles from "./style.module.css";
import Button from "@/components/Button";
import PropTypes from "prop-types";

export default function Modal({ actionType, onConfirm, onCancel }) {
  return (
    <div className={styles.modal}>
      <p>{`Are you sure you want to ${actionType} this service?`}</p>
      <div>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  actionType: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
