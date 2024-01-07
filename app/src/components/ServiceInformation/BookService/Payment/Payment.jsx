import styles from "./style.module.css";
import PaymentMethods from "./PaymentMethods";
import BookingSummary from "./BookingSummary";

export default function Payment() {
  return (
    <div className={styles.paymentWrapper}>
      <PaymentMethods />
      <BookingSummary />
    </div>
  );
}
