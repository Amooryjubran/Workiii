import { create } from "zustand";

const useLanguageSelector = create((set) => ({
  selectedLanguage: "en",
  setLanguage: (language) => set({ selectedLanguage: language }),
}));

export default useLanguageSelector;
