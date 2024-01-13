import { create } from "zustand";
import { getListOfBookings } from "@/api/dashboard";

const useBookingsStore = create((set) => ({
  bookings: [],
  searchValue: "",
  order: "Newest",
  isLoading: false,
  setSearchValue: (value) => set({ searchValue: value }),
  setOrder: (value) => set({ order: value }),

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
}));

export default useBookingsStore;
