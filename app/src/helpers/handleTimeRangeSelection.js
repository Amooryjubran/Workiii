export const handleTimeRangeSelection = (
  selectedTime,
  selectedTimes,
  setSelectedTimes,
  timeSlots
) => {
  // Convert 12-hour format to 24-hour format for comparison
  const convertTo24HourFormat = (time) => {
    const [hours, suffix] = time.split(" ");
    let [hour] = hours.split(":");
    hour = parseInt(hour, 10);
    if (suffix === "PM" && hour < 12) hour += 12;
    if (suffix === "AM" && hour === 12) hour = 0;
    return hour;
  };

  const selectedHour = convertTo24HourFormat(selectedTime);

  if (selectedTimes.includes(selectedTime)) {
    // If the clicked time slot is already selected, reset the selection
    setSelectedTimes([]);
  } else if (selectedTimes.length === 0) {
    // First click: select single time slot
    setSelectedTimes([selectedTime]);
  } else if (selectedTimes.length === 1) {
    // Second click: select a range
    const startHour = convertTo24HourFormat(selectedTimes[0]);
    const endHour = selectedHour;

    // Generate the range of time slots
    const rangeStart = Math.min(startHour, endHour);
    const rangeEnd = Math.max(startHour, endHour);

    const newRange = timeSlots.filter((time) => {
      const hour = convertTo24HourFormat(time);
      return hour >= rangeStart && hour <= rangeEnd;
    });

    setSelectedTimes(newRange);
  } else {
    // Third click: reset and select new single time slot
    setSelectedTimes([selectedTime]);
  }
};
