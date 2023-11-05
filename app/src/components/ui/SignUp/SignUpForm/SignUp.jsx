import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import useSignUpStore from "@/store/useSignUpStore";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Input from "@/components/Input";
import EmailImg from "images/Signup/email.svg";
import ContactImg from "images/Signup/contact.svg";
import PasswordImg from "images/Signup/password.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { createUser } from "@/api/userAuth";

export default function SignUpForm() {
  const { t } = useTranslation();
  const { userType, goToNextStep, formData, setFormData } = useSignUpStore();

  const userTypeCapitalized =
    userType.charAt(0).toUpperCase() + userType.slice(1);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleSignUp = async (event) => {
    event.preventDefault();

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
      if (
        response.status === 201 ||
        (response.status === 200 &&
          response.data.message.includes("New verification code sent"))
      ) {
        // The user was created or is already created but not verified
        goToNextStep();
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error during sign up:", error.response || error.message);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>
        {t("signUpForm.signUpTitle", { userType: userTypeCapitalized })} <br />
        {t("signUpForm.fillFields")}
      </h2>
      <form className={styles.authFormContainer}>
        <div className={styles.formInputs}>
          <label>Name</label>
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={ContactImg}
              alt="Name"
              height={24}
              width={24}
            />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.formInputs}>
          <label>Email</label>
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={EmailImg}
              alt="Email"
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
          <label>Phone Number</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            defaultCountry="CA"
          />
        </div>
        <div className={styles.formInputs}>
          <label>Password</label>
          <div>
            <Image
              classNameWrapper={styles.inputImgWrapper}
              className={styles.inputImg}
              src={PasswordImg}
              alt="Password"
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
        </div>
        <Button
          onClick={handleSignUp}
          className={`${styles.button} ${styles.authContainerBtn}`}
          type="button"
        >
          {t("signup.next")}
        </Button>
      </form>
    </div>
  );
}
