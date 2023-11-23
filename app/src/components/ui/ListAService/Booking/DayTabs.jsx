import PropTypes from "prop-types";
import styles from "./style.module.css";
import Button from "@/components/Button";

const DayTabs = ({ daysOfWeek, selectedDay, onSelectDay }) => {
  return (
    <div className={styles.dayTabs}>
      {daysOfWeek.map((day) => (
        <Button
          key={day}
          className={selectedDay === day ? styles.activeTab : styles.tab}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </Button>
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
