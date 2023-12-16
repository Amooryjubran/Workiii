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

// Function to get the list of users
export const getAllUsers = async () => {
  return axios.get(`${API_BASE_URL}/api/getAllUsers`);
};

// Function to get a specific user's information
export const getUser = async (userId) => {
  return axios.get(`${API_BASE_URL}/api/user/${userId}`);
};

// Function to get the list of services
export const getAllServices = async () => {
  return axios.get(`${API_BASE_URL}/api/getAllServices`);
};

// Function to get a specific service's information
export const getService = async (serviceId) => {
  return axios.get(`${API_BASE_URL}/api/service/${serviceId}`);
};

// Function to approve a service
export const approveService = async (serviceId) => {
  return axios.put(`${API_BASE_URL}/api/${serviceId}/approve`);
};

// Function to decline a service
export const declineService = async (serviceId) => {
  return axios.put(`${API_BASE_URL}/api/${serviceId}/decline`);
};
