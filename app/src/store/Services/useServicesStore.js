import { create } from "zustand";
import {
  getService,
  getCategories,
  getLocations,
  addToWishList,
  removeFromWishList,
} from "@/api/servicesPage";

const useServicesStore = create((set, get) => ({
  services: [],
  isLoading: true,
  categories: [],
  categoriesLoading: false,
  locaitonsLoading: false,
  filters: {
    category: [],
    priceMin: 0,
    priceMax: 1000,
    locations: [],
  },
  maxPrice: 1000,
  searchQuery: "",

  // Search Function
  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilter: (filterName, value) => {
    if (filterName === "reset") {
      // Reset all filters and the search query
      set({
        filters: {
          category: [],
          priceMin: 0,
          priceMax: 1000,
          locations: [],
        },
        searchQuery: "",
      });
    } else {
      // Update a specific filter
      set((state) => ({
        filters: {
          ...state.filters,
          [filterName]: value,
        },
        searchQuery: state.searchQuery,
      }));
    }

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

  // Add a new parameter for the search query
  fetchServices: async (userId, searchQuery = "") => {
    const { filters } = get();
    const locations = filters.locations;
    const cities =
      locations.length > 0
        ? locations.map((loc) => loc.location.city).join(",")
        : undefined;

    set({ isLoading: true });
    try {
      console.log(searchQuery);
      // Include search query and city in the filters if they're provided
      const effectiveFilters = { ...filters, searchQuery };
      if (cities) {
        effectiveFilters.city = cities; // Include city filter
      }
      console.log(effectiveFilters);
      const response = await getService(effectiveFilters, userId);
      if (response && response.data) {
        set({ services: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ categoriesLoading: true });
    try {
      const response = await getCategories();
      if (response && response.data) {
        set({ categories: response?.data?.data });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ categoriesLoading: false });
    }
  },

  // fetch locations
  fetchLocations: async () => {
    set({ locaitonsLoading: true });
    try {
      const response = await getLocations();
      if (response && response?.data) {
        set({ locations: response?.data?.services });
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      set({ locaitonsLoading: false });
    }
  },

  handleLocationChange: (location) => {
    console.log(location);
    set((state) => ({
      filters: {
        ...state.filters,
        locations: state.filters.locations.some(
          (loc) =>
            loc.location.latLng.lat === location.location.latLng.lat &&
            loc.location.latLng.lng === location.location.latLng.lng
        )
          ? state.filters.locations.filter(
              (loc) =>
                loc.location.latLng.lat !== location.location.latLng.lat ||
                loc.location.latLng.lng !== location.location.latLng.lng
            )
          : [...state.filters.locations, location],
      },
    }));
    console.log("Updated Filters:", get().filters.locations);
    get().fetchServices();
  },

  // Search For Services Function
  handleSearch: async (userId, query) => {
    get().setSearchQuery(query);
    get().setFilter({
      category: [],
      priceMin: 0,
      priceMax: 1000,
      searchQuery: query,
    });

    setTimeout(() => {
      get().fetchServices(userId, query);
    }, 1000);
  },

  // handle Category Change
  handleCategoryChange: (category) => {
    if (category === "reset") {
      set({
        filters: {
          category: [],
          priceMin: 0,
          priceMax: 1000,
          locations: [],
        },
        searchQuery: "",
      });
    } else {
      set((state) => ({
        filters: {
          ...state.filters,
          category: state.filters.category.includes(category)
            ? state.filters.category.filter((c) => c !== category)
            : [...state.filters.category, category],
        },
      }));
    }
    // Trigger the fetchServices with the updated filters
    get().fetchServices();
  },

  // Handle price change

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
