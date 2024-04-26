import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useSignUpStore from "@/store/useSignUpStore";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Input from "@/components/Input";
import LinkButton from "@/components/Link";
import EmailImg from "images/Signup/email.svg";
import ContactImg from "images/Signup/contact.svg";
import PasswordImg from "images/Signup/password.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { createUser } from "@/api/userAuth";

export default function SignUpForm() {
  const { t } = useTranslation();
  const { userType, goToNextStep, formData, setFormData } = useSignUpStore();
  const [userMessage, setUserMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const userTypeCapitalized =
    userType.charAt(0).toUpperCase() + userType.slice(1);
  console.log(userType);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    setUserMessage(""); // Clear any previous messages
    setIsError(false); // Reset the error state
    try {
      // POST request to your API endpoint
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        userType: userType,
      });
      // Handle the response accordingly
      if (response.status === 201 && response.data.status === "success") {
        // The user was created successfully
        goToNextStep();
      } else if (response.status === 200 && response.data.status === "info") {
        // User already exists, set a user-friendly message
        setUserMessage(response.data.message);
        setIsError(true);
      } else {
        // Handle other statuses
        setUserMessage("Unexpected response status: " + response.status);
        setIsError(true);
      }
    } catch (error) {
      setUserMessage(
        error.response?.data?.message || "An error occurred during sign up."
      );
      setIsError(true);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>
        {t("signUpForm.signUpTitle", {
          userType: t(`userTypeSelector.${userType}`),
        })}
        <br />
        {t("signUpForm.fillFields")}
      </h2>
      <form className={styles.authFormContainer}>
        <div className={styles.formInputs}>
          <label>{t("signUpForm.Name")}</label>
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={ContactImg}
              alt={t("signUpForm.Name")}
              height={24}
              width={24}
            />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("signUpForm.Name")}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.formInputs}>
          <label>{t("signUpForm.Email")}</label>{" "}
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={EmailImg}
              alt={t("signUpForm.Email")}
              height={24}
              width={24}
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Example@gmail.com"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.formInputs}>
          <label>{t("signUpForm.PhoneNumber")}</label>
          <PhoneInput
            placeholder={t("signUpForm.EnterPhone")}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="CA"
            className={styles.phoneInput}
          />
        </div>
        <div className={styles.formInputs}>
          <label>{t("signUpForm.Password")}</label>{" "}
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={PasswordImg}
              alt={t("signUpForm.Password")}
              height={24}
              width={24}
            />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="************"
              className={styles.input}
            />
          </div>
          {isError && (
            <span className={styles.errorMessage}>{userMessage}</span>
          )}
        </div>
        <Button
          onClick={handleSignUp}
          className={`${styles.button} ${styles.authContainerBtn}`}
          type="button"
        >
          {t("signup.next")}
        </Button>
      </form>
      <div className={styles.loginText}>{t("signUpForm.orLogin")}</div>
      <LinkButton to="login" className={styles.login}>
        {t("signUpForm.login")}
      </LinkButton>
    </div>
  );
}
