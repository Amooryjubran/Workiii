import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },

  login: async (user) => {
    // be be continued
    set({ isLoading: true });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoading: false });
  },
  finishLoading: () => set({ isLoading: false }),
}));

export default useUserStore;
