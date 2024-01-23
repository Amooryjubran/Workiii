import { create } from "zustand";
import {
  getListOfBookings,
  getUser,
  getTheBooking,
  acceptBooking,
  declineBooking,
} from "@/api/dashboard";

const useBookingsStore = create((set, get) => ({
  bookings: [],
  booking: null,
  searchValue: "",
  order: "Newest",
  isLoading: false,
  clientTab: false,
  selectedClientID: null,
  selectedBookingID: null,
  selectedClient: null,
  selectedBooking: null,
  selectedABooking: null,
  headerModalType: null,

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

  fetchAbooking: async (clubID) => {
    set({ isLoading: true });
    try {
      const response = await getTheBooking(clubID);
      if (response) {
        set({ selectedABooking: response?.data?.booking });
      }
    } catch (error) {
      console.error("Error fetching a booking:", error);
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

  // Function to accept a booking
  acceptBookingRequest: async (userId, bookingId, clientId) => {
    set({ isLoading: true });
    try {
      const response = await acceptBooking({ userId, bookingId, clientId });
      if (response) {
        console.log("Booking accepted:", response.data);
        // Re-fetch bookings list after successful booking acceptance
        await get().fetchBookings(userId);
      }
      return true;
    } catch (error) {
      console.error("Error in accepting booking:", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Function to decline a booking
  declineBookingRequest: async (userId, bookingId, clientId) => {
    set({ isLoading: true });
    try {
      const response = await declineBooking({ userId, bookingId, clientId });
      if (response) {
        console.log("Booking accepted:", response.data);
        // Re-fetch bookings list after successful booking acceptance
        await get().fetchBookings(userId);
      }
      return true;
    } catch (error) {
      console.log("Error in declining booking", error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  setClientTab: (userId, clientOrder, bookingID) => {
    set({
      clientTab: true,
      selectedClientID: userId,
      selectedBooking: clientOrder,
      selectedBookingID: bookingID,
    });
  },

  resetClientTab: () => {
    set({
      clientTab: false,
      selectedClientID: null,
      selectedClient: null,
      selectedBookingID: null,
    });
  },
}));

export default useBookingsStore;
