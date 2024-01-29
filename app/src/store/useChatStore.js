import { create } from "zustand";

const useChatStore = create((set) => ({
  currentUser: null,
  isChatModalOpen: false,
  isModalOpen: false,
  showUserInfo: false,

  openChat: (user) =>
    set(() => ({
      currentUser: user,
      isModalOpen: true,
      showUserInfo: false,
    })),

  closeChat: () =>
    set((state) => ({
      isModalOpen: state.showUserInfo ? true : false,
      showUserInfo: state.showUserInfo ? false : state.showUserInfo,
      currentUser: state.showUserInfo ? state.currentUser : null,
    })),

  toggleUserInfo: () =>
    set((state) => ({
      showUserInfo: !state.showUserInfo,
    })),

  defaultChatModal: () => {
    set({ isChatModalOpen: true });
  },
  resetChatModal: () => {
    set({ isChatModalOpen: false });
  },
}));

export default useChatStore;
