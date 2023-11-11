import useSignUpStore from "@/store/useSignUpStore";
import { verifyUser } from "@/api/userAuth";
import useUserStore from "@/store/useUserStore";

export default function OTP() {
  const { otp, setOTP, goToNextStep, formData, errors, setErrors } =
    useSignUpStore();
  const setUser = useUserStore((state) => state.setUser);

  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const verifyOTP = async () => {
    try {
      // API call to the server to verify the OTP
      const response = await verifyUser(formData.email, otp);
      if (response.data.status === 200) {
        const { user, token } = response.data;
        // Update Zustand state with the user data
        setUser(user);
        // Store user and token in local storage (or another appropriate storage)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", `"${token}"`);
        // finally go to the next step
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
