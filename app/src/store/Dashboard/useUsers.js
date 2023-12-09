import { create } from "zustand";
import { getAllUsers } from "@/api/dashboard";

const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await getAllUsers();
      if (response && response.data) {
        console.log(response);
        set({ users: response?.data?.data });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUsersStore;
