import { create } from "zustand";
import { getServiceDetail, getServiceReviews } from "@/api/ServicePage";

const useServicePageStore = create((set) => ({
  service: null,
  serviceReviews: null,
  status: "idle",
  reviewsStatus: "idle",
  error: null,
  reviewsError: null,

  fetchServiceDetail: async (id) => {
    set({ status: "loading" });
    try {
      const response = await getServiceDetail(id);
      set({ service: response.data, status: "success" });
    } catch (error) {
      set({ status: "error", error: error.message });
    }
  },
  fetchServiceReviews: async (id) => {
    set({ reviewsStatus: "loading" });
    try {
      const response = await getServiceReviews(id);
      set({ serviceReviews: response.data, reviewsStatus: "success" });
    } catch (error) {
      set({ reviewsStatus: "error", reviewsError: error.message });
    }
  },
}));

export default useServicePageStore;
