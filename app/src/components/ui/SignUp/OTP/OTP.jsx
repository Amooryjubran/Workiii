import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useSignUpStore from "@/store/useSignUpStore";
import { verifyUser } from "@/api/userAuth";
import useUserStore from "@/store/useUserStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "@/components/Image";
import styles from "./style.module.css";
import Timer from "images/Signup/timer.svg";

export default function OTP() {
  const { t } = useTranslation();
  const {
    goToNextStep,
    formData,
    setErrors: setGlobalErrors,
  } = useSignUpStore();
  const setUser = useUserStore((state) => state.setUser);
  const [otp, setOTP] = useState(Array(6).fill(""));
  const [localErrors, setLocalErrors] = useState(""); // Local state for errors
  const inputRefs = useRef(new Array(6).fill(null));
  const [timeLeft, setTimeLeft] = useState(300);
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pasteData
      .split("")
      .concat(Array(6 - pasteData.length).fill(""));
    setOTP(newOtp);
    const focusIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[focusIndex].focus();
  };

  const handleChange = (index) => (e) => {
    const value = e.target.value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOTP(newOtp);
    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index) => (e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const otpString = otp.join("").trim();
    if (otpString.length < 6) {
      setLocalErrors("Please enter all 6 digits of the OTP.");
      setGlobalErrors({ otp: "Please enter all 6 digits of the OTP." }); // Update Zustand store if needed elsewhere
      return;
    }

    try {
      const response = await verifyUser(formData.email, otpString);
      if (response.data.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", `"${token}"`);
        goToNextStep();
      } else {
        setLocalErrors(response.data.message || "Verification failed.");
      }
    } catch (error) {
      setLocalErrors(
        error.response?.data?.message ||
          "An error occurred during verification."
      );
    }
  };
  useEffect(() => {
    inputRefs.current[0].focus();
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      // Time's up logic or disable further input/resend
      setLocalErrors(t("signup.timeExpired"));
      setTimeout(() => {
        setLocalErrors("");
      }, 3000);
    }
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.verificationContainer}>
      <h2>{t("signup.verificationCode")}</h2>
      <div className={styles.verificationInputs}>
        {otp.map((value, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={value}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste}
            maxLength={1}
            className={styles.otpInput}
            placeholder="-"
            autoComplete="off"
          />
        ))}
      </div>
      {localErrors && <p className={styles.error}>*{localErrors}</p>}
      <Button className={styles.verifyBtn} onClick={verifyOTP}>
        {t("signup.verify")}
      </Button>
      <div className={styles.resendContainer}>
        <div className={styles.resendWrapper}>
          <span>{t("signup.didYouRecieve")}</span>
          <Button>{t("signup.resend")}</Button>
        </div>
        <div className={styles.resendTimer}>
          <Image src={Timer} />
          <span>{formatTime()}</span>
        </div>
      </div>
    </div>
  );
}
