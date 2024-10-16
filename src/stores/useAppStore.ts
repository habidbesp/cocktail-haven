import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice";

export const useAppStore = create<RecipiesSliceType>()(
  devtools((...args) => ({
    ...createRecipesSlice(...args),
  }))
);
