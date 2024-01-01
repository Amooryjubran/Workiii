import styles from "./style.module.css";
import Date from "./Date";
import Header from "./Header";
import Location from "./Location";

export default function Appointment() {
  return (
    <div className={styles.appointmenWrapper}>
      <Header />
      <Location />
      <Date />
    </div>
  );
}
