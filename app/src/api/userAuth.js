import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API}`;

export const createUser = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/createUser`, userData);
};

export const verifyUser = async (email, otp) => {
  return axios.post(`${API_BASE_URL}/api/verifyUser`, {
    email,
    code: otp,
  });
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_BASE_URL}/api/signIn`, {
    email,
    password,
  });
};
