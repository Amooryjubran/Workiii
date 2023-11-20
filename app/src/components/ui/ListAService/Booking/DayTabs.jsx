import PropTypes from "prop-types";
import styles from "./style.module.css";

const DayTabs = ({ daysOfWeek, selectedDay, onSelectDay }) => {
  return (
    <div className={styles.dayTabs}>
      {daysOfWeek.map((day) => (
        <button
          key={day}
          className={selectedDay === day ? styles.activeTab : ""}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

DayTabs.propTypes = {
  daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDay: PropTypes.string.isRequired,
  onSelectDay: PropTypes.func.isRequired,
};

export default DayTabs;
