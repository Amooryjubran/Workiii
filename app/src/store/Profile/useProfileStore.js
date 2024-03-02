import { create } from "zustand";
import moment from "moment";

const useProfileStore = create((set, get) => ({
  // Initial state
  userName: "",
  userPhoneNumber: "",
  userEmail: "",
  userDateOfBirth: {
    month: "",
    day: "",
    year: "",
  },
  userAddress: "",
  userImg: null,
  isDragging: false,
  showMonthModal: false,
  showDayModal: false,
  showYearModal: false,

  // Actions
  setUserName: (name) => set({ userName: name }),
  setUserPhoneNumber: (phoneNumber) => set({ userPhoneNumber: phoneNumber }),
  setUserEmail: (email) => set({ userEmail: email }),
  setUserDateOfBirth: (dateOfBirth) => {
    set((state) => {
      if (!dateOfBirth) {
        console.error("setUserDateOfBirth received undefined dateOfBirth");
        return state; // Return current state unchanged if dateOfBirth is undefined
      }

      return {
        ...state,
        userDateOfBirth: {
          ...state.userDateOfBirth,
          ...dateOfBirth,
        },
      };
    });
  },
  setUserAddress: (address) => set({ userAddress: address }),
  setUserImg: (img) => set({ userImg: img }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setShowMonthModal: (show) => set({ showMonthModal: show }),
  setShowDayModal: (show) => set({ showDayModal: show }),
  setShowYearModal: (show) => set({ showYearModal: show }),
  toggleModal: (modalName) => {
    const modalState = get()[modalName];
    set({ [modalName]: !modalState });
  },

  handleDragIn: (e) => {
    e.preventDefault();
    set({ isDragging: true });
  },

  handleDragOut: (e) => {
    e.preventDefault();
    set({ isDragging: false });
  },

  handleDragOver: (e) => {
    e.preventDefault(); // This is necessary to allow the drop
  },

  handleDrop: (e) => {
    e.preventDefault();
    e.stopPropagation();
    set({ isDragging: false }); // Reset dragging state

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      set({ userImg: url });
    }
  },
  closeAllModals: () => {
    set({ showMonthModal: false, showDayModal: false, showYearModal: false });
  },
  handleDateChange: (part, value) => {
    const dateOfBirth = get().userDateOfBirth;
    dateOfBirth[part] = value;
    set({ userDateOfBirth: dateOfBirth });
    get().closeAllModals();
  },
  initializeFromUser: (user) => {
    set({
      userName: user.name || "",
      userPhoneNumber: user.phoneNumber || "",
      userEmail: user.email || "",
      userDateOfBirth: {
        month: user.dateOfBirth ? moment(user.dateOfBirth).format("M") : "",
        day: user.dateOfBirth ? moment(user.dateOfBirth).format("D") : "",
        year: user.dateOfBirth ? moment(user.dateOfBirth).format("YYYY") : "",
      },
      userImg: user.profileImg || null,
    });
  },
  handleRemoveImg: () => set({ userImg: null }), // Added action to remove the image
}));

export default useProfileStore;
