import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

// function to get all the categories of the services
export const getServiceDetail = async (id) => {
  return axios.get(`${API_BASE_URL}/api/getServiceDetail/${id}`);
};
