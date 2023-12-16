import { create } from "zustand";
import {
  getAllServices,
  getService,
  approveService,
  declineService,
} from "@/api/dashboard";

const useServicesStore = create((set, get) => ({
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
        set({ selectedService: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  approveService: async (serviceId) => {
    set({ isLoading: true });
    try {
      const response = await approveService(serviceId);
      if (response && response.status === 200) {
        console.log("Service approved successfully");
        // Use get() to access fetchServices
        await get().fetchServices();
        await get().fetchService(serviceId);
      }
    } catch (error) {
      console.error("Error approving service:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  declineService: async (serviceId) => {
    set({ isLoading: true });
    try {
      const response = await declineService(serviceId);
      if (response && response.status === 200) {
        console.log("Service declined successfully");
        await get().fetchServices();
        await get().fetchService(serviceId);
      }
    } catch (error) {
      console.error("Error declining service:", error);
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
