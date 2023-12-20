import { create } from "zustand";
import { getService } from "@/api/servicesPage";

const useServicesStore = create((set, get) => ({
  services: [],
  isLoading: false,
  filters: {
    category: "",
    priceMin: 0,
    priceMax: 1000,
  },
  maxPrice: 1000,

  setFilter: (filterName, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));

    // Recalculate maxPrice when services change
    const services = get().services;
    const maxPrice =
      services
        .map((service) => parseInt(service.serviceInfo.servicePrice, 10))
        .filter((price) => !isNaN(price))
        .reduce((max, price) => Math.max(max, price), 0) || 1000;
    set({ maxPrice: Math.max(maxPrice, get().maxPrice) });

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
