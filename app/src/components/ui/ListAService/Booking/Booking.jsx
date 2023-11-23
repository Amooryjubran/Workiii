import { useState, useEffect } from "react";
import styles from "./style.module.css";
import useListAServiceStore from "@/store/useListAServiceStore";
import DayTabs from "./DayTabs";
import TimeInputs from "./TimeInputs";
import useDaysOfWeek from "@/hooks/useDaysOfWeek";

export default function Booking() {
  const { booking, setBooking } = useListAServiceStore();
  const daysOfWeek = useDaysOfWeek();
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);

  useEffect(() => {
    let shouldUpdate = false;
    const initialBooking = { ...booking };
    daysOfWeek.forEach((day) => {
      if (!initialBooking[day] || initialBooking[day].length === 0) {
        initialBooking[day] = [{ from: "", to: "" }]; // Empty time slot
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      setBooking(initialBooking);
    }
  }, [booking, setBooking, daysOfWeek]);

  const addWorkingHours = () => {
    const newBooking = { ...booking };
    newBooking[selectedDay].push({ from: "", to: "" });
    setBooking(newBooking);
  };

  const removeWorkingHours = (index) => {
    const newBooking = { ...booking };
    if (newBooking[selectedDay].length > 1) {
      newBooking[selectedDay].splice(index, 1);
    } else {
      newBooking[selectedDay][index] = { from: "", to: "" };
    }
    setBooking(newBooking);
  };

  const updateWorkingHours = (index, field, value) => {
    const newBooking = { ...booking };
    newBooking[selectedDay][index][field] = value;
    setBooking(newBooking);
  };
  return (
    <div className={styles.bookingContainer}>
      <DayTabs
        daysOfWeek={daysOfWeek}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
      <TimeInputs
        selectedDay={selectedDay}
        booking={booking}
        onAddHours={addWorkingHours}
        onUpdateHours={updateWorkingHours}
        onRemoveHours={removeWorkingHours}
      />
    </div>
  );
}
