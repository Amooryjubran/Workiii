import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useUserStore from "@/store/useUserStore";
import Button from "@/components/Button";
import Input from "@/components/Input";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "16px 40px 16px 16px",
      borderRadius: "8px",
      border: "1px solid rgb(176, 176, 176)",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ setShowInputs }) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const addCreditCard = useUserStore((state) => state.addCreditCard);
  const { user } = useUserStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!firstName || !lastName) {
      setErrorMessage(t("services.booking.PleaseEnterYourName"));
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: `${firstName} ${lastName}`,
        email: email,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      await addCreditCard(user._id, paymentMethod);
      setShowInputs(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* Name Input Fields */}
      <div className={styles.inputsNames}>
        <Input
          type="text"
          placeholder={t("services.booking.FirstName")}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.inputField}
        />
        <Input
          type="text"
          placeholder={t("services.booking.LastName")}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {/* Email Field - Optional */}
      <Input
        type="email"
        placeholder={t("services.booking.EmailAddress")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
      />

      <div className={styles.cardElementContainer}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      {errorMessage && <div className={styles.error}>*{errorMessage}</div>}
      <Button
        type="submit"
        disabled={!stripe}
        className={styles.paymentMethodsWrapperBtnStripe}
      >
        {t("services.booking.AddCreditCard")}
      </Button>
    </form>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  setShowInputs: PropTypes.func.isRequired,
};
