import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// Function to add a new category
export const addCategory = async (userId, category, certificateRequired) => {
  return axios.post(`${API_BASE_URL}/api/addCategory`, {
    userId,
    category,
    certificateRequired,
  });
};

// Function to get the list of categories
export const getCategories = async () => {
  return axios.get(`${API_BASE_URL}/api/getCategories`);
};

// Function to delete a category
export const deleteCategory = async (userId, categoryId) => {
  return axios.delete(`${API_BASE_URL}/api/deleteCategory`, {
    data: {
      userId,
      categoryId,
    },
  });
};
