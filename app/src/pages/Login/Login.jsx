import { useEffect, useState } from "react";
import styles from "./style.module.css";
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
  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log();
      setErrors({
        ...errors,
        login: error.response.data.message || "An error occurred during login.",
      });
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
                value={email}
                onChange={handleInputChange}
                placeholder="Example@gmail.com"
                className={styles.input}
              />
            </div>
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
                value={password}
                onChange={handleInputChange}
                placeholder="************"
                className={styles.input}
              />
            </div>
            {errors && (
              <span className={styles.errorMessage}>{errors.login}</span>
            )}
          </div>
          <LinkButton
            to="/forgot-password"
            className={styles.authContainerBackLink}
          >
            {t("login.forgotPassword")}
          </LinkButton>
          <Button
            className={`${styles.button} ${styles.authContainerBtn}`}
            type="button"
            onClick={handleLogin}
          >
            {t("login.login")}
          </Button>
        </form>
      </div>
    </div>
  );
}
