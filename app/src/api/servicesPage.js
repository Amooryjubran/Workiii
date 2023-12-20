import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// Function to get all approved services with optional filters
export const getService = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return axios.get(
    `${API_BASE_URL}/api/getlAllApprovedServices?${queryParams}`
  );
};
