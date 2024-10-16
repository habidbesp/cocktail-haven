import { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";
import { Categories } from "../types";

export type RecipiesSliceType = {
  categories: Categories;
  fetchCategories: () => void;
};

export const createRecipesSlice: StateCreator<RecipiesSliceType> = (set) => ({
  categories: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
});
