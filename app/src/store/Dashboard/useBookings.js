import { create } from "zustand";
import { getListOfBookings, getUser } from "@/api/dashboard";

const useBookingsStore = create((set, get) => ({
  bookings: [],
  searchValue: "",
  order: "Newest",
  isLoading: false,
  clientTab: false,
  selectedClientID: null,
  selectedClient: null,
  selectedBooking: null,

  setSearchValue: (value) => set({ searchValue: value }),
  setOrder: (value) => set({ order: value }),

  fetchUser: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await getUser(userId);
      if (response && response.data) {
        set({ selectedClient: response.data.data });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBookings: async (userID) => {
    set({ isLoading: true });
    try {
      const response = await getListOfBookings(userID);
      if (response) {
        set({ bookings: response?.data });
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
    set({ isLoading: false });
  },
  setClientTab: (userId, clientOrder) => {
    set({
      clientTab: true,
      selectedClientID: userId,
      selectedBooking: clientOrder,
    });
  },

  resetClientTab: () => {
    set({ clientTab: false, selectedClientID: null, selectedClient: null });
  },
}));

export default useBookingsStore;
