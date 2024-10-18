import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";

export const useAppStore = create<RecipiesSliceType & FavoritesSliceType>()(
  devtools((...args) => ({
    ...createRecipesSlice(...args),
    ...createFavoritesSlice(...args),
  }))
);
