import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Calendar from "react-calendar";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
import "react-calendar/dist/Calendar.css";
import "./calender.css";
import Button from "@/components/Button";
import { handleTimeRangeSelection } from "@/helpers/handleTimeRangeSelection";
import { useTranslation } from "react-i18next";
export default function DateComponent() {
  const { t } = useTranslation();

  const {
    serviceInformation,
    setSelectedTimes,
    selectedTimes,
    setSelectedDate,
    updateTotalPrice,
  } = useBookServiceStore();

  const { booking } = serviceInformation;

  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const minDate = new Date(); // Today's date

  useEffect(() => {
    const times = Object.keys(booking).reduce((acc, day) => {
      const availableSlot = booking[day].find((slot) => slot.from && slot.to);
      if (availableSlot) {
        acc[day] = { from: availableSlot.from, to: availableSlot.to };
      }
      return acc;
    }, {});

    setAvailableTimes(times);
  }, [booking]);

  useEffect(() => {
    const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
    if (availableTimes[dayOfWeek]) {
      const startTime = parseInt(
        availableTimes[dayOfWeek].from.split(":")[0],
        10
      );
      const endTime = parseInt(availableTimes[dayOfWeek].to.split(":")[0], 10);
      const slots = [];
      for (let hour = startTime; hour <= endTime; hour++) {
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? "AM" : "PM";

        slots.push(
          `${formattedHour < 10 ? "0" : ""}${formattedHour}:00 ${period}`
        );
      }
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  }, [date, availableTimes]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
    setSelectedTimes([]);
  };

  const handleTimeSelection = (selectedTime) => {
    handleTimeRangeSelection(
      selectedTime,
      selectedTimes,
      setSelectedTimes,
      timeSlots
    );
    updateTotalPrice();
  };

  return (
    <div className={styles.calenderWrapper}>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={minDate}
        className={styles.calender}
        tileClassName={({ date }) => {
          const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });
          if (availableTimes[dayOfWeek]) {
            return "highlight";
          }
        }}
      />
      <div className={styles.timeSlots}>
        {timeSlots.length ? (
          timeSlots.map((time) => (
            <Button
              key={time}
              className={`${styles.timeSlot} ${
                selectedTimes.includes(time) ? styles.timeSlotActive : ""
              }`}
              onClick={() => handleTimeSelection(time)}
            >
              {time}
            </Button>
          ))
        ) : (
          <div className={styles.noAvailableTime}>
            {t("services.booking.noTime")}
          </div>
        )}
      </div>
    </div>
  );
}
