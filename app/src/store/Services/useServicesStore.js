import { create } from "zustand";
import { getService } from "@/api/servicesPage";

const useServicesStore = create((set) => ({
  services: [],
  isLoading: false,

  fetchServices: async () => {
    set({ isLoading: true });
    try {
      const response = await getService();
      if (response && response.data) {
        set({ services: response?.data?.data });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useServicesStore;
