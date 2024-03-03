import { lazy, useRef, Suspense } from "react";
import PropTypes, { func, shape, oneOfType, instanceOf } from "prop-types";
import moment from "moment";
import Input from "@/components/Input";
import styles from "./style.module.css";
import useProfileStore from "@/store/Profile/useProfileStore";
import Button from "@/components/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { useTranslation } from "react-i18next";
const Location = lazy(() => import("./Location"));
// Modal Component
const SimpleModal = ({ onClose, title, children, innerRef }) => (
  <div className={styles.modalBackdrop} ref={innerRef}>
    <div className={styles.modalContent}>
      <h4>{title}</h4>
      <ul className={styles.modalList}>{children}</ul>
      <Button onClick={onClose} className={styles.closeButton}>
        Close
      </Button>
    </div>
  </div>
);

SimpleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  innerRef: oneOfType([func, shape({ current: instanceOf(Element) })]),
};

// UserInputs Component
export default function UserInputs() {
  const { t } = useTranslation();
  const monthModalRef = useRef();
  const dayModalRef = useRef();
  const yearModalRef = useRef();
  const {
    userName,
    setUserName,
    userPhoneNumber,
    setUserPhoneNumber,
    userEmail,
    setUserEmail,
    userDateOfBirth,
    setUserDateOfBirth,
    showMonthModal,
    setShowMonthModal,
    showDayModal,
    setShowDayModal,
    showYearModal,
    setShowYearModal,
    setUserAddress,
  } = useProfileStore();

  useClickOutside(monthModalRef, () => setShowMonthModal(false));
  useClickOutside(dayModalRef, () => setShowDayModal(false));
  useClickOutside(yearModalRef, () => setShowYearModal(false));

  const months = moment.months();
  const currentYear = moment().year();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  const handleDateChange = (part, value) => {
    if (value === undefined) {
      return; // Early return to prevent calling setState with undefined value
    }

    // Update the specific part of the date of birth in the global state
    setUserDateOfBirth({ ...userDateOfBirth, [part]: value.toString() });

    // Close the relevant modal
    if (part === "month") setShowMonthModal(false);
    if (part === "day") setShowDayModal(false);
    if (part === "year") setShowYearModal(false);
  };

  // Function to generate button text
  const getButtonText = (part) => {
    switch (part) {
      case "month":
        return userDateOfBirth.month
          ? months[parseInt(userDateOfBirth.month, 10) - 1]
          : "Month";
      case "day":
        return userDateOfBirth.day ? userDateOfBirth.day.toString() : "Day";
      case "year":
        return userDateOfBirth.year ? userDateOfBirth.year.toString() : "Year";
      default:
        return "Select";
    }
  };

  return (
    <>
      <div className={styles.userInputContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <span>{t("profile.profileTab.name")}</span>
            <Input
              className={styles.userInput}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("profile.profileTab.name")}
              name={t("profile.profileTab.name")}
            />
          </div>

          <div className={styles.inputWrapper}>
            <span>{t("profile.profileTab.PhoneNumber")}</span>
            <Input
              className={styles.userInput}
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              placeholder={t("profile.profileTab.PhoneNumberPlaceholder")}
              name={t("profile.profileTab.PhoneNumber")}
            />
          </div>
        </div>

        <div className={`${styles.inputContainer}`}>
          <div className={`${styles.inputContainerDOB}`}>
            <span>{t("profile.profileTab.DateOfBirth")}</span>
            <div className={styles.inputContainerDOBWrapper}>
              <div>
                <Button onClick={() => setShowMonthModal(true)}>
                  {getButtonText("month")}
                </Button>
                {showMonthModal && (
                  <SimpleModal
                    onClose={() => setShowMonthModal(false)}
                    title={t("profile.profileTab.Month")}
                    innerRef={monthModalRef}
                  >
                    {months.map((month, index) => (
                      <li
                        key={index}
                        onClick={() => handleDateChange("month", index + 1)}
                      >
                        {month}
                      </li>
                    ))}
                  </SimpleModal>
                )}
              </div>
              <div>
                <Button onClick={() => setShowDayModal(true)}>
                  {getButtonText("day")}
                </Button>
                {showDayModal && (
                  <SimpleModal
                    onClose={() => setShowDayModal(false)}
                    title={t("profile.profileTab.Day")}
                    innerRef={dayModalRef}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <li
                        key={i}
                        onClick={() => handleDateChange("day", i + 1)}
                      >
                        {i + 1}
                      </li>
                    ))}
                  </SimpleModal>
                )}
              </div>
              <div>
                <Button onClick={() => setShowYearModal(true)}>
                  {getButtonText("year")}
                </Button>
                {showYearModal && (
                  <SimpleModal
                    onClose={() => setShowYearModal(false)}
                    title={t("profile.profileTab.Year")}
                    innerRef={yearModalRef}
                  >
                    {years.map((year) => (
                      <li
                        key={year}
                        onClick={() => handleDateChange("year", year)}
                      >
                        {year}
                      </li>
                    ))}
                  </SimpleModal>
                )}
              </div>
            </div>
          </div>
          <div className={`${styles.inputWrapper} ${styles.inputContainer}`}>
            <span>{t("profile.profileTab.Email")}</span>
            <Input
              className={styles.userInput}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="email@example.com"
              name="Email"
            />
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Location onAddressSelect={setUserAddress} />
      </Suspense>
    </>
  );
}
