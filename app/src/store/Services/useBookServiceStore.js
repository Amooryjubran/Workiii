import { create } from "zustand";

const useBookServiceStore = create((set) => ({
  modal: false,
  currentStep: 0,
  location: [],
  serviceInformation: null,

  errors: {
    location: {},
  },

  // funciton to set the booking modal
  setModal: (modal) => set(() => ({ modal })),

  // Function to set location information
  setLocation: (locationData) => {
    // Add validation if necessary
    set((state) => ({
      location: locationData,
      errors: { ...state.errors, location: {} },
    }));
  },

  // function to store the service to be re-used
  // Function to set the service informtion
  setServiceInformation: (serviceInfo) =>
    set(() => ({ serviceInformation: serviceInfo })),

  // Navigation functions
  setCurrentStep: (currentStep) => set(() => ({ currentStep })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useBookServiceStore;
