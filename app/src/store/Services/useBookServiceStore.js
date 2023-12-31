import create from "zustand";

const useBookServiceStore = create((set) => ({
  modal: false,
  currentStep: 0,
  setModal: (modal) => set(() => ({ modal })),
  setCurrentStep: (currentStep) => set(() => ({ currentStep })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useBookServiceStore;
