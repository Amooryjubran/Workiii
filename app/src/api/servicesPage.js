import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// Function to get all approved services with optional filters
export const getService = async (filters = {}, userId) => {
  const queryParams = new URLSearchParams();
  // Check if there is a search query
  if (filters.searchQuery) {
    queryParams.append("search", filters.searchQuery);
  } else {
    // If no search query, append all other filters
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== "") {
        queryParams.append(key, value);
      }
    }
  }
  // Always include userId if it's provided
  if (userId) {
    queryParams.append("userId", userId);
  }
  return axios.get(
    `${API_BASE_URL}/api/getlAllApprovedServices?${queryParams}`
  );
};

// function to get all the categories of the services
export const getCategories = async () => {
  return axios.get(`${API_BASE_URL}/api/servicesCategories`);
};
// Add to wishlist API function
export const addToWishList = async (userId, itemId) => {
  return axios.patch(`${API_BASE_URL}/api/addToWishList`, { userId, itemId });
};

// Remove from wishlist API function
export const removeFromWishList = async (userId, itemId) => {
  return axios.delete(`${API_BASE_URL}/api/removeFromWishList`, {
    params: { userId, itemId },
  });
};

// function to get all the locations of the services
export const getLocations = async () => {
  return axios.get(`${API_BASE_URL}/api/servicesLocations`);
};
