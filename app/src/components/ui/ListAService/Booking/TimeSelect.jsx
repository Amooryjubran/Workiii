import PropTypes from "prop-types";
import Select from "react-select";

// Function to generate time options
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      options.push({ value: time, label: time });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

const TimeSelect = ({ value, onChange }) => {
  return (
    <Select
      options={timeOptions}
      value={{ label: value, value }}
      onChange={(selectedOption) => onChange(selectedOption.value)}
    />
  );
};

TimeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimeSelect;
