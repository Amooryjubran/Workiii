import { loginUser } from "@/api/userAuth";
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,

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
