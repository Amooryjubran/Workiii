import create from "zustand";
import { getServiceDetail } from "@/api/ServicePage";

const useServicePageStore = create((set) => ({
  service: null,
  status: "idle",
  error: null,

  fetchServiceDetail: async (id) => {
    set({ status: "loading" });
    try {
      const response = await getServiceDetail(id);
      set({ service: response.data, status: "success" });
    } catch (error) {
      set({ status: "error", error: error.message });
    }
  },
}));

export default useServicePageStore;
