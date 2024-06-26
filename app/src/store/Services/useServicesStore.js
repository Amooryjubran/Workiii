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
    sortOrder: "",
    rating: 0,
  },
  maxPrice: 1000,
  searchQuery: "",

  // Function to generate filter objects
  generateFilterObjects: () => {
    const {
      filters,
      handleCategoryChange,
      handleLocationChange,
      setFilter,
      setSortOrder,
    } = get();

    const categoryFilters = filters.category.map((cat) => ({
      type: "category",
      value: cat,
      handler: () => handleCategoryChange(cat),
    }));

    const locationFilters = filters.locations.map((loc) => ({
      type: "location",
      value: loc.location.city,
      handler: () => handleLocationChange(loc),
    }));

    const priceFilter = [
      ...(filters.priceMin > 0 || filters.priceMax < 1000
        ? [
            {
              type: "price",
              value: `Price: $${filters.priceMin} - $${filters.priceMax}`,
              handler: () => {
                setFilter("priceMin", 0);
                setFilter("priceMax", 1000);
              },
            },
          ]
        : []),
    ];

    const sortFilter = filters.sortOrder
      ? [
          {
            type: "sort",
            value: `Sort: ${
              filters.sortOrder === "highest" ? "Highest" : "Lowest"
            }`,
            handler: () => setSortOrder(""),
          },
        ]
      : [];

    const ratingFilter =
      filters.rating > 0
        ? [
            {
              type: "rating",
              value: `Rating: ${filters.rating} Stars`,
              handler: () => setFilter("rating", 0),
            },
          ]
        : [];

    return [
      ...categoryFilters,
      ...locationFilters,
      ...priceFilter,
      ...sortFilter,
      ...ratingFilter,
    ];
  },

  // Check if any filters are active to display the reset button
  anyFilterActive: () => {
    const { filters } = get();
    return (
      filters.category.length > 0 ||
      filters.locations.length > 0 ||
      filters.rating > 0 ||
      ["highest", "lowest"].includes(filters.sortOrder) ||
      filters.priceMin !== 0 ||
      filters.priceMax !== 1000
    );
  },

  // Search Function
  setSearchQuery: (query) => set({ searchQuery: query }),

  setSortOrder: (order) => {
    set((state) => ({
      filters: {
        ...state.filters,
        sortOrder: order,
      },
    }));
    get().fetchServices(); // Refetch services with the new order
  },

  setRating: (rating) =>
    set((state) => ({
      filters: {
        ...state.filters,
        rating,
      },
    })),

  setFilter: (filterName, value) => {
    if (filterName === "reset") {
      // Reset all filters and the search query
      set({
        filters: {
          category: [],
          priceMin: 0,
          priceMax: 1000,
          locations: [],
          sortOrder: "",
          rating: 0,
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
      get().fetchServices();
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
  fetchServices: async () => {
    const { filters, searchQuery } = get();
    const { category, priceMin, priceMax, locations, sortOrder, rating } =
      filters;

    let effectiveFilters = {
      ...(category.length > 0 && { category }),
      ...(priceMin > 0 && { priceMin }),
      ...(priceMax < 1000 && { priceMax }),
      ...(locations.length > 0 && {
        city: locations.map((loc) => loc.location.city).join(","),
      }),
      ...(sortOrder && { sort: sortOrder }),
      ...(rating && { rating }),
      ...(searchQuery.trim() !== "" && { searchQuery }),
    };

    set({ isLoading: true });
    try {
      const response = await getService(effectiveFilters);
      if (response && response.data) {
        set({ services: response.data.data });
        console.log("Services fetched successfully");
      } else {
        console.log("No data received from fetch");
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
