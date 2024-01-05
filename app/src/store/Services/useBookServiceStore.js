import { create } from "zustand";

const useBookServiceStore = create((set) => ({
  modal: false,
  currentStep: 0,
  location: [],
  serviceInformation: null,
  selectedTimes: [],
  totalPrice: 0,

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
  setServiceInformation: (serviceInfo) =>
    set(() => ({ serviceInformation: serviceInfo })),

  // Function to set selectedTimes
  setSelectedTimes: (times) => set(() => ({ selectedTimes: times })),

  // Function to update total price
  updateTotalPrice: () =>
    set((state) => {
      const pricePerHalfHour =
        state.serviceInformation?.serviceInfo?.servicePrice || 0;
      const totalSlots = state.selectedTimes.length;
      return { totalPrice: totalSlots * pricePerHalfHour };
    }),

  // Navigation functions
  setCurrentStep: (currentStep) => set(() => ({ currentStep })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useBookServiceStore;
