import { loginUser, updateCreditCard, getCreditCards } from "@/api/userAuth";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  creditCards: [],

  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await loginUser(email, password);
      if (response.data.status === 200) {
        const { user, token } = response.data;
        set({ user, isLoading: false });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", `"${token}"`);
      } else {
        // Handle login failure
        set({ isLoading: false });
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (error) {
      // Handle errors, for example, network issues
      set({ isLoading: false });
      throw error; // Re-throw the error to be caught in the component
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoading: false });
  },
  finishLoading: () => set({ isLoading: false }),

  addCreditCard: async (userId, paymentMethod) => {
    try {
      const response = await updateCreditCard(userId, paymentMethod.id);

      if (response && response.status === 200) {
        set((state) => {
          const updatedUser = {
            ...state.user,
            creditCards: state.user.creditCards
              ? [...state.user.creditCards, paymentMethod]
              : [paymentMethod],
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return { user: updatedUser };
        });
      } else {
        console.error("Update failed", response.message);
      }
    } catch (err) {
      console.error("Error updating user's card:", err);
    }
  },
  fetchCreditCards: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await getCreditCards(userId);
      if (response && response.status === 200) {
        set({ creditCards: response.data.creditCards, isLoading: false });
      } else {
        console.error("Fetch failed", response.message);
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user's credit cards:", err);
      set({ isLoading: false });
    }
  },

  loadUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));
// Initialize the user state from localStorage
useUserStore.getState().loadUser();
export default useUserStore;
