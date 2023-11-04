import useSignUpStore from "@/store/useSignUpStore";

export default function index() {
  const { otp, setOTP, goToNextStep, errors, setErrors } = useSignUpStore();

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleVerifyClick = () => {
    if (!otp || otp.trim() === "") {
      // Set the OTP error if it's missing
      setErrors((prevErrors) => ({ ...prevErrors, otp: "OTP is required." }));
    } else {
      // Proceed to the next step if OTP is present
      goToNextStep();
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
