import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Input from "@/components/Input";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";

// Define a simple modal component for selecting date parts
const SimpleModal = ({ onClose, title, children }) => (
  <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <h4>{title}</h4>
      <ul className={styles.modalList}>{children}</ul>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  </div>
);
SimpleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function UserInputs() {
  const { user } = useUserStore();
  const [userName, setUserName] = useState(user.name || "");
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    user.phoneNumber || ""
  );
  const [userEmail, setUserEmail] = useState(user.email || "");
  const [userDateOfBirth, setUserDateOfBirth] = useState({
    month: user.dateOfBirth ? moment(user.dateOfBirth).format("M") : "",
    day: user.dateOfBirth ? moment(user.dateOfBirth).format("D") : "",
    year: user.dateOfBirth ? moment(user.dateOfBirth).format("YYYY") : "",
  });

  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const handleDateChange = (part, value) => {
    setUserDateOfBirth((prevState) => ({
      ...prevState,
      [part]: value,
    }));
    // Close modal after selection
    if (part === "month") setShowMonthModal(false);
    if (part === "day") setShowDayModal(false);
    if (part === "year") setShowYearModal(false);
  };

  const months = moment.months();
  const currentYear = moment().year();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  return (
    <div>
      <div className={styles.inputContainer}>
        {/* Name Input */}
        <div>
          <span>Name</span>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <span>Phone Number</span>
          <Input
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            placeholder="+9655"
          />
        </div>

        {/* Email Input */}
        <div>
          <span>Email</span>
          <Input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>

      {/* Date of Birth Selection */}
      <div className={styles.inputContainer}>
        <span>Date Of Birth</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowMonthModal(true)}>
            {userDateOfBirth.month
              ? months[parseInt(userDateOfBirth.month, 10) - 1]
              : "Select Month"}
          </button>
          <button onClick={() => setShowDayModal(true)}>
            {userDateOfBirth.day || "Select Day"}
          </button>
          <button onClick={() => setShowYearModal(true)}>
            {userDateOfBirth.year || "Select Year"}
          </button>
        </div>
      </div>

      {/* Month Selection Modal */}
      {showMonthModal && (
        <SimpleModal
          onClose={() => setShowMonthModal(false)}
          title="Select Month"
        >
          {months.map((month, index) => (
            <li
              key={index}
              onClick={() => handleDateChange("month", index + 1)}
              style={{ cursor: "pointer" }}
            >
              {month}
            </li>
          ))}
        </SimpleModal>
      )}

      {/* Day Selection Modal */}
      {showDayModal && (
        <SimpleModal onClose={() => setShowDayModal(false)} title="Select Day">
          {Array.from({ length: 31 }, (_, i) => (
            <li
              key={i}
              onClick={() => handleDateChange("day", i + 1)}
              style={{ cursor: "pointer" }}
            >
              {i + 1}
            </li>
          ))}
        </SimpleModal>
      )}

      {/* Year Selection Modal */}
      {showYearModal && (
        <SimpleModal
          onClose={() => setShowYearModal(false)}
          title="Select Year"
        >
          {years.map((year) => (
            <li
              key={year}
              onClick={() => handleDateChange("year", year)}
              style={{ cursor: "pointer" }}
            >
              {year}
            </li>
          ))}
        </SimpleModal>
      )}
    </div>
  );
}
