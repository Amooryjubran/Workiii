import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import TimeSelect from "./TimeSelect";

const TimeInputs = ({
  selectedDay,
  booking,
  onAddHours,
  onUpdateHours,
  onRemoveHours,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.timeInputs}>
      {booking[selectedDay]?.map((hours, index) => (
        <div key={index} className={styles.timeSlot}>
          <TimeSelect
            value={hours.from}
            onChange={(newValue) => onUpdateHours(index, "from", newValue)}
          />
          <TimeSelect
            value={hours.to}
            onChange={(newValue) => onUpdateHours(index, "to", newValue)}
          />
          <button onClick={() => onRemoveHours(index)}>
            {t("listAServiceServicesTab.remove")}
          </button>
        </div>
      ))}
      <button onClick={onAddHours}>
        {t("listAServiceServicesTab.addHours")}
      </button>
    </div>
  );
};

TimeInputs.propTypes = {
  selectedDay: PropTypes.string.isRequired,
  booking: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
      })
    )
  ).isRequired,
  onAddHours: PropTypes.func.isRequired,
  onUpdateHours: PropTypes.func.isRequired,
  onRemoveHours: PropTypes.func.isRequired,
};

export default TimeInputs;
