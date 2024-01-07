import { create } from "zustand";

const useBookServiceStore = create((set) => ({
  modal: false,
  currentStep: 0,
  location: [],
  serviceInformation: null,
  selectedDate: null,
  selectedTimes: [],
  totalPrice: 0,
  serviceFee: 0,
  selectedCard: null,
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

  // Function to set selectedDate
  setSelectedDate: (date) => set(() => ({ selectedDate: date })),

  // Function to set the selected card
  setSelectedCard: (cardId) => set(() => ({ selectedCard: cardId })),

  // Function to calculate service fee
  calculateServiceFee: () =>
    set((state) => {
      const fee = state.totalPrice * 0.1; // 10% service fee
      return { serviceFee: fee };
    }),

  // Updated function to calculate total price and service fee
  updateTotalPrice: () =>
    set((state) => {
      const pricePerHalfHour =
        state.serviceInformation?.serviceInfo?.servicePrice || 0;
      const totalSlots = state.selectedTimes.length;
      const basePrice = totalSlots * pricePerHalfHour;
      const serviceFee = basePrice * 0.1; // 10% service fee
      return { totalPrice: basePrice, serviceFee: serviceFee };
    }),

  // Navigation functions
  setCurrentStep: (currentStep) => set(() => ({ currentStep })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useBookServiceStore;
