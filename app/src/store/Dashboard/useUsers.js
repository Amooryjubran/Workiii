import { create } from "zustand";
import { getAllUsers, getUser } from "@/api/dashboard";

const useUsersStore = create((set) => ({
  users: [],
  isLoading: false,
  userTab: false,
  selectedUserId: null,
  selectedUser: null,

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

  fetchUser: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await getUser(userId);
      if (response && response.data) {
        set({ selectedUser: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setUserTab: (userId) => {
    set({ userTab: true, selectedUserId: userId });
  },

  resetUserTab: () => {
    set({ userTab: false, selectedUserId: null, selectedUser: null });
  },
}));

export default useUsersStore;
