import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// Function to get all approved services with optional filters
export const getService = async (filters = {}, userId) => {
  const queryParams = new URLSearchParams(filters).toString();
  const userIdParam = userId ? `&userId=${userId}` : "";
  console.log("how many times");
  return axios.get(
    `${API_BASE_URL}/api/getlAllApprovedServices?${queryParams}${userIdParam}`
  );
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
