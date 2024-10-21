import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipiesSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export const useAppStore = create<
  RecipiesSliceType & FavoritesSliceType & NotificationSliceType
>()(
  devtools((...args) => ({
    ...createRecipesSlice(...args),
    ...createFavoritesSlice(...args),
    ...createNotificationSlice(...args),
  }))
);
