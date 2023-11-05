import useSignUpStore from "@/store/useSignUpStore";
import { verifyUser } from "@/api/userAuth";

export default function OTP() {
  const { otp, setOTP, goToNextStep, formData, errors, setErrors } =
    useSignUpStore();

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const verifyOTP = async () => {
    try {
      // API call to the server to verify the OTP
      const response = await verifyUser(formData.email, otp);
      if (response.data.status === 200) {
        goToNextStep();
      } else {
        // Handle any other status messages here
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: response.data.message || "Verification failed.",
        }));
      }
    } catch (error) {
      // Handle the error case
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp:
          error.response?.data?.message ||
          "An error occurred during verification.",
      }));
    }
  };

  const handleVerifyClick = () => {
    if (!otp || otp.trim() === "") {
      setErrors((prevErrors) => ({ ...prevErrors, otp: "OTP is required." }));
    } else {
      verifyOTP();
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input value={otp} onChange={handleChange} placeholder="OTP" />
      {errors && errors.otp && <p style={{ color: "red" }}>{errors.otp}</p>}
      <button onClick={handleVerifyClick}>Verify</button>
    </div>
  );
}
