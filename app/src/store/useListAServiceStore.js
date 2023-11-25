import { create } from "zustand";

const useListAServiceStore = create((set) => ({
  // State variables
  step: 1,
  serviceInfo: {
    serviceTitle: "",
    serviceDescription: "",
    serviceCategory: "",
    serviceCertificate: null,
    servicePrice: "",
    serviceDuration: "",
  },
  booking: [],
  location: [],
  images: [],
  errors: {
    serviceInfo: {},
    booking: {},
    location: {},
    images: {},
  },

  // Functions to navigate between steps
  goToNextStep: () => set((state) => ({ step: state.step + 1 })),
  goToPreviousStep: () => set((state) => ({ step: state.step - 1 })),
  setStep: (newStep) => set({ step: newStep }), // Function to directly set the step

  // Function to set service information and validate
  setServiceInfo: (info) => {
    set((state) => ({
      serviceInfo: { ...state.serviceInfo, ...info },
      errors: { ...state.errors, serviceInfo: {} }, // Update errors as needed
    }));
  },

  // Function to set booking information
  setBooking: (bookingData) => {
    // Add validation if necessary
    set((state) => ({
      booking: { ...state.booking, ...bookingData },
      errors: { ...state.errors, booking: {} }, // Update errors as needed
    }));
  },

  // Function to set location information
  setLocation: (locationData) => {
    // Add validation if necessary
    set((state) => ({
      location: locationData,
      errors: { ...state.errors, location: {} },
    }));
  },

  // Function to set images
  setImages: (images) => {
    // Add validation if necessary
    set((state) => ({
      images: images,
      errors: { ...state.errors, images: {} }, // Update errors as needed
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
      serviceInfo: {
        serviceTitle: "",
        serviceDescription: "",
        serviceCategory: "",
        serviceCertificate: null,
        servicePrice: "",
        serviceDuration: "",
        // Reset other service information fields
      },
      booking: [],
      location: [],
      images: [],
      errors: {
        serviceInfo: {},
        booking: {},
        location: {},
        images: {},
      },
    }),
}));

export default useListAServiceStore;
