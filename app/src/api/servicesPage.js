import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// Function to get all approved services
export const getService = async () => {
  return axios.get(`${API_BASE_URL}/api/getlAllApprovedServices`);
};
