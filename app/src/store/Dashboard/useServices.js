import { create } from "zustand";
import { getAllServices, getService } from "@/api/dashboard";

const useServicesStore = create((set) => ({
  services: [],
  isLoading: false,
  serviceTab: false,
  selectedServiceId: null,
  selectedService: null,

  fetchServices: async () => {
    set({ isLoading: true });
    try {
      const response = await getAllServices();
      if (response && response.data) {
        set({ services: response?.data?.data });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchService: async (serviceId) => {
    set({ isLoading: true });
    try {
      const response = await getService(serviceId);
      if (response && response.data) {
        console.log(response);

        set({ selectedService: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setServiceTab: (serviceId) => {
    set({ serviceTab: true, selectedServiceId: serviceId });
  },

  resetServiceTab: () => {
    set({ serviceTab: false, selectedServiceId: null, selectedService: null });
  },
}));

export default useServicesStore;
