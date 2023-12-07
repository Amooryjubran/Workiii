import { create } from "zustand";
import {
  addCategory as apiAddCategory,
  getCategories as apiGetCategories,
  deleteCategory as apiDeleteCategory,
} from "@/api/dashboard";

const useCategoriesStore = create((set, get) => ({
  categories: [],
  isLoading: false,
  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await apiGetCategories();
      if (response && response.data) {
        set({ categories: response?.data?.data?.categories });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  addCategory: async (userId, categoryName, certificateRequired) => {
    try {
      await apiAddCategory(userId, categoryName, certificateRequired);
      // Refetch categories after adding
      get().fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  },
  deleteCategory: async (userId, categoryId) => {
    try {
      await apiDeleteCategory(userId, categoryId);
      // Refetch categories after adding
      get().fetchCategories();
    } catch (err) {
      console.log("error deleteing", err);
    }
  },
}));

export default useCategoriesStore;
