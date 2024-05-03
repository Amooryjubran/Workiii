import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Loader } from "react-feather";
import { useTranslation } from "react-i18next";
import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import Back from "@/assets/images/Signup/back.svg";
import LinkButton from "@/components/Link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import EmailImg from "images/Signup/email.svg";
import PasswordImg from "images/Signup/password.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user } = useUserStore();
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  // Check if the user is already logged in and redirect if necessary
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({ ...errors, login: t("login.missingCredentials") });
      setTimeout(() => setErrors({ ...errors, login: "" }), 3000);
      return;
    }
    if (!isValidEmail(email)) {
      setErrors({ ...errors, login: t("login.invalidEmail") });
      setTimeout(() => setErrors({ ...errors, login: "" }), 3000);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErrors({
        ...errors,
        login: error.response.data.message || t("login.errorOccurred"),
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setErrors({ ...errors, login: "" }), 3000);
    }
  };

  return (
    <div className={styles.authContainer}>
      <LinkButton to="/" className={styles.authContainerBackLink}>
        <Image src={Back} alt="Back" />
        <span>{t("signup.backToHome")}</span>
      </LinkButton>
      <div className={styles.authWrapper}>
        <h2>{t("login.prompt")}</h2>
        <span>{t("login.welcome")}</span>
        <form className={styles.authFormContainer}>
          <div className={styles.formInputs}>
            <label>{t("signUpForm.Email")}</label>
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
                value={email}
                onChange={handleInputChange}
                placeholder="Example@gmail.com"
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.formInputs}>
            <label>{t("signUpForm.Password")}</label>
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
                value={password}
                onChange={handleInputChange}
                placeholder="************"
                className={styles.input}
              />
            </div>
            <div className={styles.errorContainer}>
              {errors.login && (
                <span className={styles.errorMessage}>{errors.login}</span>
              )}
            </div>
          </div>
          <LinkButton
            to="forgot-password"
            className={styles.authContainerBackLink}
          >
            {t("login.forgotPassword")}
          </LinkButton>
          <Button
            className={`${styles.button} ${styles.authContainerBtn}`}
            type="button"
            onClick={handleLogin}
          >
            {isLoading ? (
              <Loader className={styles.loader} />
            ) : (
              t("login.login")
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
