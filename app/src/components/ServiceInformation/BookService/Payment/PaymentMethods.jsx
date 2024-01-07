import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useUserStore from "@/store/useUserStore";
import CheckoutForm from "./CheckoutForm";
import Image from "@/components/Image";
import Skeleton from "@/components/Skeleton";
import Button from "@/components/Button";
import PlustImg from "images/ListAService/plus-circle.svg";
import Visa from "images/CreditCards/visa.svg";
import MasterCard from "images/CreditCards/masterCard.svg";
import Amex from "images/CreditCards/americanExpress.svg";
import discover from "images/CreditCards/discover.svg";
import Unchecked from "images/CreditCards/Unchecked.svg";
import Checked from "images/CreditCards/Checked.svg";
import useBookServiceStore from "@/store/Services/useBookServiceStore";
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);

const getCardImage = (brand) => {
  switch (brand) {
    case "visa":
      return Visa;
    case "mastercard":
      return MasterCard;
    case "amex":
      return Amex;
    case "discover":
      return discover;
    default:
      return Visa;
  }
};

export default function PaymentMethods() {
  const { user, fetchCreditCards, creditCards, isLoading } = useUserStore();
  const { setSelectedCard, selectedCard } = useBookServiceStore();
  const { t } = useTranslation();
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      fetchCreditCards(user._id);
    }
  }, [user, fetchCreditCards]);

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId);
  };

  const CheckboxImage = ({ isSelected }) => {
    return (
      <Image
        src={isSelected ? Checked : Unchecked}
        alt={isSelected ? "Checked" : "Unchecked"}
      />
    );
  };
  CheckboxImage.propTypes = {
    isSelected: PropTypes.bool.isRequired,
  };
  const RenderCreditCards = () => {
    if (isLoading) {
      return Array(4)
        .fill(true)
        .map((_, i) => (
          <Skeleton width="auto" height="106px" key={i} borderRadius="10px" />
        ));
    }
    return creditCards?.map((card, index) => (
      <Button
        key={index}
        className={`${styles.cardContainer} ${
          selectedCard === card.creditCardTokenID ? styles.activeCard : ""
        }`}
        onClick={() => handleCardSelect(card.creditCardTokenID)}
      >
        <div>
          <CheckboxImage isSelected={selectedCard === card.creditCardTokenID} />
        </div>
        <div className={styles.cardContainerMiddle}>
          <span>{`${card.firstName} ${card.lastName}`}</span>
          <span>{card.creditCardType}</span>
          <span>**** **** **** {card.last4}</span>
        </div>
        <div className={styles.cardContainerLast}>
          <Image
            src={getCardImage(card.creditCardType)}
            alt={card.creditCardType}
          />
          <span>
            {t("services.booking.EndsAt")}: {card.expiryDate}
          </span>
        </div>
      </Button>
    ));
  };
  return (
    <div className={styles.paymentMethodsWrapper}>
      <h1>{t("services.booking.PaymentMethods")}</h1>
      <div className={styles.paymentMethodsCards}>{RenderCreditCards()}</div>

      {showInputs && (
        <Elements stripe={stripePromise}>
          <CheckoutForm setShowInputs={setShowInputs} />
        </Elements>
      )}
      <Button
        className={styles.paymentMethodsWrapperBtn}
        onClick={handleButtonClick}
      >
        <Image src={PlustImg} alt={t("services.booking.AddCard")} />
        <span>{t("services.booking.AddCard")}</span>
      </Button>
    </div>
  );
}
