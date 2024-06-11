import { create } from "zustand";
import axios from "axios";

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
  frequentlyAskedQuestions: [{ question: "", answer: "" }],
  errors: {
    serviceInfo: {},
    booking: {},
    location: {},
    images: {},
    frequentlyAskedQuestions: {},
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

  // Function to set location information
  setFrequentlyAskedQuestions: (data) => {
    // Add validation if necessary
    set((state) => ({
      frequentlyAskedQuestions: data,
      errors: { ...state.errors, frequentlyAskedQuestions: {} },
    }));
  },
  // Function to set errors
  setErrors: (errorData) => {
    set((state) => ({
      errors: { ...state.errors, ...errorData },
    }));
  },

  // Function to submit service data using Axios
  submitService: async (userId) => {
    const state = useListAServiceStore.getState();
    const apiEndpoint = `${import.meta.env.VITE_API}/api/listAService`;
    try {
      const response = await axios.post(apiEndpoint, {
        serviceData: {
          serviceInfo: state.serviceInfo,
          booking: state.booking,
          location: state.location,
          images: state.images,
          frequentlyAskedQuestions: state.frequentlyAskedQuestions,
        },
        userId: userId,
      });

      if (response.status === 200) {
        // Reset state on success
        set({
          step: 1,
          serviceInfo: {},
          booking: [],
          location: [],
          images: [],
          frequentlyAskedQuestions: [{ question: "", answer: "" }],
        });
      } else {
        console.log(response);
      }

      return response.data; // Return the response data
    } catch (error) {
      console.error("Error submitting service:", error);
      // Handle the error (e.g., show an error message)
    }
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
