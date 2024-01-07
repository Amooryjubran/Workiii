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
export const updateCreditCard = async (userId, paymentMethodId) => {
  const API_BASE_URL = `${import.meta.env.VITE_API}`;
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/user/${userId}/creditCards`,
      {
        paymentMethodId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user's card:", error);
    throw error;
  }
};

export const getCreditCards = async (userId) => {
  return axios.get(`${API_BASE_URL}/api/user/${userId}/creditCards`);
};
