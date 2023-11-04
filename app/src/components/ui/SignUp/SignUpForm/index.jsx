import { useEffect } from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import useSignUpStore from "@/store/useSignUpStore";
import styles from "./style.module.css";
import useLanguageSelector from "@/store/useLanguageSelector";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function index() {
  const { isLoaded, user } = useAuth();
  const { formData, setFormData, goToNextStep, userType, setErrors } =
    useSignUpStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };
  const { localization } = useLanguageSelector();

  console.log(userType);
  useEffect(() => {
    if (isLoaded && user) {
    }
  }, [isLoaded, user]);

  return (
    <div className={styles.authForm}>
      <h2>
        {userType} Sign up <br />
        Fill the fields to sign up
      </h2>

      <SignUp
        appearance={{
          elements: {
            header: styles.footer,
            formButtonPrimary: styles.signUpForm,
            socialButtons: styles.socialButtons,
            rootBox: styles.rootBox,
            card: styles.card,
            footer: styles.footer,
            formFieldRow__name: styles.formName,
            formFieldHintText__firstName: styles.footer,
            formFieldHintText__lastName: styles.footer,
            main: styles.mainWrapper,
            otpCodeFieldInputs: styles.otpCodeFieldInputs,
          },
        }}
        afterSignInUrl="/success/:successID"
      />

      {/* <button onClick={handleNextClick}>Next</button> */}
    </div>
  );
}
