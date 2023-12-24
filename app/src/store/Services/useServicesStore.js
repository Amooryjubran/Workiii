import { create } from "zustand";
import {
  getService,
  addToWishList,
  removeFromWishList,
} from "@/api/servicesPage";

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

  fetchServices: async (userId) => {
    const { filters } = get();
    set({ isLoading: true });
    try {
      const response = await getService(filters, userId);
      if (response && response.data) {
        set({ services: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Method to add a service to the wishlist
  addToWishlist: async (userId, itemId) => {
    try {
      const response = await addToWishList(userId, itemId);
      console.log(response.data.message);
      // Additional logic if needed
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  // Method to remove a service from the wishlist
  removeFromWishlist: async (userId, itemId) => {
    try {
      const response = await removeFromWishList(userId, itemId);
      console.log(response.data.message);
      // Additional logic if needed
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  },
}));

export default useServicesStore;
