import create from "zustand";

const useSignUpStore = create((set) => ({
  // State variables
  step: 1,
  userType: null,
  formData: {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  },
  otp: "",
  errors: {
    userType: null,
    formData: {},
    otp: null,
  },

  // Functions to navigate between steps
  goToNextStep: () => set((state) => ({ step: state.step + 1 })),
  goToPreviousStep: () => set((state) => ({ step: state.step - 1 })),

  // Function to set the user type and validate
  setUserType: (type) => {
    if (!type) {
      set((state) => ({
        errors: { ...state.errors, userType: "Please select a user type." },
      }));
      return;
    }
    set((state) => ({
      userType: type,
      errors: { ...state.errors, userType: null },
    }));
  },

  // Function to set form data
  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  // Function to set OTP and validate
  setOTP: (otpValue) => {
    if (!otpValue) {
      set((state) => ({
        errors: { ...state.errors, otp: "Please enter the OTP." },
      }));
      return;
    }
    set((state) => ({
      otp: otpValue,
      errors: { ...state.errors, otp: null },
    }));
  },

  // Function to set errors
  setErrors: (errorData) => {
    set((state) => ({
      errors: { ...state.errors, ...errorData },
    }));
  },

  // Reset function to reset all states and start over
  reset: () =>
    set({
      step: 1,
      userType: null,
      formData: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
      },
      otp: "",
      errors: {
        userType: null,
        formData: {},
        otp: null,
      },
    }),
}));

export default useSignUpStore;
