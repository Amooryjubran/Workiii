import { create } from "zustand";
import { getService } from "@/api/servicesPage";

const useServicesStore = create((set, get) => ({
  services: [],
  isLoading: false,
  filters: {
    category: "",
    priceMin: 0,
    priceMax: 1000,
    // Add other filters as needed
  },

  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));

    // Fetch services with the updated filters
    get().fetchServices();
  },

  fetchServices: async () => {
    const { filters } = get();
    set({ isLoading: true });
    try {
      const response = await getService(filters);
      if (response && response.data) {
        set({ services: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useServicesStore;
