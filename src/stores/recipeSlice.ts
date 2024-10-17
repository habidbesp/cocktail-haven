import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeService";
import { Categories, Drinks, SearchFilter } from "../types";

export type RecipiesSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipes: (serchFilter: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipiesSliceType> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (filters: SearchFilter) => {
    const drinks = await getRecipes(filters);
    set({ drinks });
  },
});
